"use client";

import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomDropdown from "@/components/leaderboard/CustomDropdown";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { filterOptions, SortOptions } from "@/config/config";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getAllDeveloper, getDeveloper } from "@/actions/developer.api";
import { countries } from "@/utils/constants/countries";
import { cities } from "@/utils/constants/cities";

const Leaderboard = () => {
  const router = useRouter();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const countryQuery = searchParams.get("country");
  const cityQuery = searchParams.get("city");
  const technologyQuery = searchParams.get("technology");
  const sortByQuery = searchParams.get("sortBy");

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const testing = () => {
    router.push(pathname + "?" + createQueryString("country", "pakistan"));
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState(null);
  const [filters, setFilters] = useState({
    country: countryQuery || "",
    city: cityQuery || "",
    technology: technologyQuery || "",
    sortBy: sortByQuery || "",
  });
  const [isCity, setIsCity] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    setFilters({
      country: countryQuery || "",
      city: cityQuery || "",
      technology: technologyQuery || "",
      sortBy: sortByQuery || "",
    })
  }, [countryQuery,  cityQuery, technologyQuery, sortByQuery])

  useEffect(() => {
    const fetchDeveloper = async () => {
      const data = await getAllDeveloper(page, results);

      data?.developers?.map((dev) => {
        const country = countries?.filter(
          (item) => item?.name?.toLowerCase() == dev?.country?.toLowerCase()
        );
        dev.country = country?.[0];
      });

      setTotalPages(data?.totalPages);
      setDevelopers(data?.developers || []);
      setFilteredDevelopers(data?.developers || null);
    };

    fetchDeveloper();
  }, [results, page]);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth?.user?.id) {
        const data = await getDeveloper(auth?.user?.id);
        data
          ? (data.country = countries?.filter(
              (item) =>
                item?.name?.toLowerCase() == data?.country?.toLowerCase()
            )?.[0])
          : "";
        setCurrentUser(data || null);
      }
    };
    fetchUser();
  }, [auth]);

  useEffect(() => {
    if (filters.country) {
      const countryCode = countries.filter(
        (item) => item.name?.toLowerCase() === filters.country?.toLowerCase()
      )?.[0];
      const filteredCities = cities.filter(
        (city) =>
          city?.country?.toLowerCase() === countryCode?.code?.toLowerCase()
      );
      setCityOptions(filteredCities.map((item) => item.name));
    }
  }, [filters]);

  useEffect(() => {
    developers &&
      setFilteredDevelopers(applyFilters(developers, filters, isCity));
  }, [countryQuery,  cityQuery, technologyQuery, sortByQuery, developers]);

  const applyFilters = (developers, filters, isCity) => {
    let filtered = [...developers];

    filtered = filterByCountry(filtered, countryQuery, isCity);
    filtered = filterByCity(filtered, cityQuery);
    filtered = filterByTechnology(filtered, technologyQuery);
    filtered = sortDevelopers(filtered, sortByQuery);

    console.log('filtered', filtered)
    console.log('countryQuery', countryQuery)
    console.log('cityQuery', cityQuery)
    console.log('technologyQuery', technologyQuery)
    console.log('sortByQuery', sortByQuery)

    return filtered;
  };

  const filterByCountry = (developers, country, isCity) => {
    if (country) {
      setIsCity(false);
      return developers?.filter((dev) =>
        dev?.country?.name?.toLowerCase().includes(country?.toLowerCase())
      );
    }
    return developers;
  };

  const filterByCity = (developers, city) => {
    if (city) {
      return developers?.filter((dev) =>
        dev?.city?.toLowerCase().includes(city?.toLowerCase())
      );
    }
    return developers;
  };

  const filterByTechnology = (developers, technology) => {
    if (technology) {
      const techLowerCase = technology?.toLowerCase();
      return developers?.filter((dev) =>
        dev?.topLanguages?.some((lang) =>
          lang?.toLowerCase().includes(techLowerCase)
        )
      );
    }
    return developers;
  };

  const sortDevelopers = (developers, sortBy) => {
    if (!sortBy) return developers;

    return developers?.sort((a, b) => {
      console.log('sorting a', a?.country?.name)
      console.log('sorting b', b?.country?.name)
      switch (sortBy) {
        case "Rank":
          return compareValues(Number(a?.rank), Number(b?.rank), true);
        case "Weight":
          return compareValues(Number(a?.weight), Number(b?.weight), true);
        case "Name":
          return compareValues(a?.name, b?.name);
        case "Country":
          return compareValues(a?.country?.name || "", b?.country?.name || "");
        case "City":
          return compareValues(a?.city || "", b?.city || "");
        default:
          return 0;
      }
    });
  };

  const compareValues = (a, b, isNumeric = false) => {
    return isNumeric ? a - b : a?.localeCompare(b);
  };

  const handleFilterChange = (id, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: value,
    }));
  };

  const handleSearchFilter = (id, value) => {
    const params = new URLSearchParams(searchParams);
  
    if (value) {
      params.set(id, value);
    } else {
      params.delete(id);
    }
  
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  const handleNavigateToSignup = () => {
    router.push("/reviewer-signup");
  };

  const increasePage = () => {
    if (page != totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const decreasePage = () => {
    if (page > 0 && page != 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="px-4 xl:px-2">
      <Header />
      <div className="flex justify-between md:items-center gap-4 py-10 flex-col md:flex-row">
        <div className="mb-4 md:mb-0">
          <span className="uppercase text-xl font-medium">Top Developers</span>
        </div>

        {/* filters */}
        <div className="flex gap-4 md:items-center flex-col md:flex-row">
          <span className="text-gray-400">Filter by:</span>
          {filterOptions.map((detail) => (
            <CustomDropdown
              value={filters[detail.id]}
              key={detail.id}
              id={detail.id}
              label={detail.label}
              countryValue={filters.country}
              options={
                detail.id === "city" ? cityOptions : detail.datalistOptions
              }
              onChange={(value) => handleFilterChange(detail.id, value)}
              handleSearchFilter={(value) =>
                handleSearchFilter(detail?.id, value)
              }
            />
          ))}
          <span className="text-gray-400">Sort by:</span>
          <CustomDropdown
            value={filters.sortBy}
            key={SortOptions.id}
            id={SortOptions.id}
            label={SortOptions.label}
            options={SortOptions.datalistOptions}
            onChange={(value) => handleFilterChange("sortBy", value)}
            handleSearchFilter={(value) => handleSearchFilter("sortBy", value)}
          />
        </div>
      </div>
      <div className="flex flex-col items-center bg-zinc-800 py-10 gap-4 rounded">
        <div>
          <h2 className="mb-0 text-center">
            {currentUser ? "Grow Together, Earn Together" : "Code Rank Earn"}
          </h2>
          <h1>
            {currentUser
              ? "Invite fellow coders to BasedAgent and unlock 10% recurring reward"
              : "Transform your repositories into revenue streams."}
          </h1>
        </div>
        <div className="reviewer-form font-bold px-2">
          <button
            // onClick={currentUser ? handleNavigateToSignup : () => {}}
            onClick={testing}
          >
            Try out for free
          </button>
        </div>

        <LeaderboardTable
          data={filteredDevelopers}
          currentUser={currentUser}
          handlePress={handleFilterChange}
          handleSearchFilter={handleSearchFilter}
        />

        {/* pagination */}
        <div className="flex justify-between flex-col md:flex-row gap-4 w-full mt-6 px-2 md:px-10">
          <div className="flex gap-3 items-center">
            <span className="text-gray-400">Results:</span>
            <CustomDropdown
              key={"results"}
              id={"results"}
              label={20}
              value={results}
              options={[20, 30, 40, 50]}
              onChange={(value) => {
                setResults(value);
              }}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="reviewer-form">
              <button className="font-extrabold" onClick={decreasePage}>
                <img src="/left_arrow.png" className="w-6 h-6" />
              </button>
            </div>
            <input
              type="tel"
              value={page}
              onChange={(e) => setPage(e.target.value)}
              className="bg-zinc-700 rounded px-4 py-2 w-16 outline-none"
            />
            <span className="mx-2">of {totalPages}</span>
            <div className="reviewer-form">
              <button className="font-extrabold" onClick={increasePage}>
                <img src="/right_arrow.png" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Leaderboard;
