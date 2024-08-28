"use client";

import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomDropdown from "@/components/leaderboard/CustomDropdown";
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable";
import { filterOptions, SortOptions } from "@/config/config";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { getAllDeveloper, getDeveloper } from "@/actions/developer.api";
import { countries } from "@/utils/constants/countries";
import { cities } from "@/utils/constants/cities";

const Leaderboard = () => {
  const router = useRouter();
  const auth = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState(null);
  const [filters, setFilters] = useState({
    country: "",
    city: "",
    technology: "",
    sortBy: "",
  });
  const [isCity, setIsCity] = useState(true);
  const [page, setPage] = useState(1);
  const [results, setResults] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [cityOptions, setCityOptions] = useState([]);

  useEffect(() => {
    const fetchDeveloper = async () => {
      const data = await getAllDeveloper(page, results);

      data.developers.map((dev) => {
        const country = countries?.filter((item) => item?.name?.toLowerCase() == dev?.country?.toLowerCase());
        dev.country = country?.[0];
      })

      setTotalPages(data?.totalPages);
      setDevelopers(data?.developers);
      setFilteredDevelopers(data?.developers);
    };

    fetchDeveloper();
  }, [results, page]);

  useEffect(() => {
    const fetchUser = async () => {
      if (auth?.user?.id) {
        const data = await getDeveloper(auth?.user?.id);
        data.country = countries?.filter((item) => item?.name?.toLowerCase() == data?.country?.toLowerCase())?.[0];
        setCurrentUser(data)
      }
    }
    fetchUser();
  }, [auth])

  useEffect(() => {
    if (filters.country) {
      const countryCode = countries.filter(item => item.name?.toLowerCase() === filters.country?.toLowerCase())?.[0];
      console.log('countryCode', countryCode)
      const filteredCities = cities.filter(city => city?.country?.toLowerCase() === countryCode?.code?.toLowerCase());
      setCityOptions(filteredCities.map(item => item.name))
    }
  }, [filters.country])

  useEffect(() => {
    setFilteredDevelopers(applyFilters(developers, filters, isCity));
  }, [filters, developers, isCity]);

  const applyFilters = (developers, filters, isCity) => {
    let filtered = [...developers];

    filtered = filterByCountry(filtered, filters.country, isCity);
    filtered = filterByCity(filtered, filters.city);
    filtered = filterByTechnology(filtered, filters.technology);
    filtered = sortDevelopers(filtered, filters.sortBy);

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
        dev?.topLanguages?.some((lang) => lang?.toLowerCase().includes(techLowerCase))
      );
    }
    return developers;
  };  

  const sortDevelopers = (developers, sortBy) => {
    if (!sortBy) return developers;

    return developers?.sort((a, b) => {
      switch (sortBy) {
        case "Rank":
          return compareValues(Number(a?.rank), Number(b?.rank), true);
        case "Weight":
          return compareValues(Number(a?.weight), Number(b?.weight), true);
        case "Name":
          return compareValues(a?.name, b?.name);
        case "Country":
          return compareValues(a?.country || '', b?.country || '');
        case "City":
          return compareValues(a?.city || '', b?.city || '');
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

  const handleNavigateToSignup = () => {
    router.push("/reviewer-signup");
  };

  const increasePage = () => {
    if (page != totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }

  const decreasePage = () => {
    if (page > 0 && page != 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }

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
              options={ detail.id === "city" ? cityOptions : detail.datalistOptions}
              onChange={(value) => handleFilterChange(detail.id, value)}
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
          />
        </div>
      </div>
      <div className="flex flex-col items-center bg-zinc-800 py-10 gap-4 rounded">
        <div>
        <h2 className="mb-0 text-center">
          Code Rank Earn
        </h2>
        <h1>
        Transform your repositories into revenue
          streams.
        </h1>
        </div>
        <div className="reviewer-form font-bold px-2">
          <button onClick={handleNavigateToSignup}>Try out for free</button>
        </div>

        <LeaderboardTable
          data={filteredDevelopers}
          currentUser={currentUser}
          handlePress={handleFilterChange}
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
              <button
                className="font-extrabold"
                onClick={decreasePage}
              >
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
              <button
                className="font-extrabold"
                onClick={increasePage}
              >
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
