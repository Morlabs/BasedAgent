import { countries } from "@/utils/constants/countries";

export const filterOptions = [
  {
    id: "country",
    label: "Country",
    datalistOptions: countries.map((item) => {
      return item.name;
    }),
  },
  {
    id: "city",
    label: "City",
    datalistOptions: ["Karachi", "Lahore", "Islamabad", "Sukkur"],
  },
  {
    id: "technology",
    label: "Technology",
    datalistOptions: [
      "Python",
      "Java",
      "C#",
      "Ruby",
      "PHP",
      "Go",
      "Rust",
      "Swift",
      "Kotlin",
      "HTML",
      "CSS",
      "Sass",
      "React",
      "Angular",
      "Vue.js",
      "Node.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Laravel",
    ],
  },
];

export const SortOptions = {
  id: "sort",
  label: "Select",
  datalistOptions: ["Rank", "Name", "Country", "City", "Weight"],
};

export const primaryColor = "#64D894";

export const currentUser = {
  id: 1,
  name: "Current User",
  country: "United States",
  city: "New York",
  weight: 120000.5,
};

export const tableData = [
  {
    id: 1,
    name: "Alice Johnson",
    country: "United States",
    city: "New York",
    weight: 120000.5,
  },
  {
    id: 2,
    name: "David Smith",
    country: "Australia",
    city: "Sydney",
    weight: 115500.0,
  },
  {
    id: 3,
    name: "Ravi Patel",
    country: "India",
    city: "Mumbai",
    weight: 113200.2,
  },
  {
    id: 4,
    name: "Laura Chen",
    country: "China",
    city: "Beijing",
    weight: 110750.3,
  },
  {
    id: 5,
    name: "Carlos Garcia",
    country: "Mexico",
    city: "Mexico City",
    weight: 108300.8,
  },
  {
    id: 6,
    name: "Emma Brown",
    country: "United Kingdom",
    city: "London",
    weight: 106500.4,
  },
  {
    id: 7,
    name: "Ahmed Khan",
    country: "Pakistan",
    city: "Karachi",
    weight: 104000.7,
  },
  {
    id: 8,
    name: "Olivia Davis",
    country: "Canada",
    city: "Toronto",
    weight: 102250.9,
  },
  {
    id: 9,
    name: "Hiroshi Tanaka",
    country: "Japan",
    city: "Tokyo",
    weight: 99800.6,
  },
  {
    id: 10,
    name: "Sophia Lopez",
    country: "Brazil",
    city: "São Paulo",
    weight: 98500.1,
  },
  {
    id: 11,
    name: "Mia Müller",
    country: "Germany",
    city: "Berlin",
    weight: 97200.0,
  },
  {
    id: 12,
    name: "Liam Anderson",
    country: "New Zealand",
    city: "Auckland",
    weight: 95500.8,
  },
  {
    id: 13,
    name: "Ethan Lee",
    country: "South Korea",
    city: "Seoul",
    weight: 93500.3,
  },
  {
    id: 14,
    name: "Isabella Rossi",
    country: "Italy",
    city: "Rome",
    weight: 91000.2,
  },
  {
    id: 15,
    name: "Lucas Dubois",
    country: "France",
    city: "Paris",
    weight: 89000.5,
  },
  {
    id: 16,
    name: "Chloe White",
    country: "South Africa",
    city: "Cape Town",
    weight: 87000.0,
  },
  {
    id: 17,
    name: "Noah Evans",
    country: "Australia",
    city: "Melbourne",
    weight: 86000.3,
  },
  {
    id: 18,
    name: "Aria Kim",
    country: "South Korea",
    city: "Busan",
    weight: 84500.7,
  },
  {
    id: 19,
    name: "James Wilson",
    country: "United States",
    city: "Los Angeles",
    weight: 83000.4,
  },
  {
    id: 20,
    name: "Sofia Gonzalez",
    country: "Spain",
    city: "Madrid",
    weight: 81000.1,
  },
];

export const userData = {
  image: "https://avatars.githubusercontent.com/u/350947?v=4",
  name: "Drew Noakes",
  country: "Australia",
  city: "Melbourne",
};

export const scoreAndbadges = {
  score: {
    score: "59,520.7",
    rank: "Top 1%",
    repos: "231",
    events: "1364",
  },
  badges: [
    {
      name: "C#",
      imgLink: "https://icon-widget.codersrank.io/api/C%23",
      level: "Top 1",
      role: "Developer",
      country: "Australia",
    },
    {
      name: "C++",
      imgLink: "https://icon-widget.codersrank.io/api/C%2B%2B",
      level: "Top 1",
      role: "Developer",
      country: "Australia",
    },
    {
      name: "JavaScript",
      imgLink: "https://icon-widget.codersrank.io/api/JavaScript",
      level: "Top 1",
      role: "Developer",
      country: "Australia",
    },
  ],
};

export const badges = [
  {
    "name": "C#",
    "imgLink": "https://icon-widget.codersrank.io/api/C%23",
    "level": "Top 1",
    "role": "Developer",
    "country": "Australia"
  },
  {
    "name": "C++",
    "imgLink": "https://icon-widget.codersrank.io/api/C%2B%2B",
    "level": "Top 1",
    "role": "Developer",
    "country": "Australia"
  },
  {
    "name": "JavaScript",
    "imgLink": "https://icon-widget.codersrank.io/api/JavaScript",
    "level": "Top 1",
    "role": "Developer",
    "country": "Australia"
  },
  {
    "name": "Python",
    "imgLink": "https://icon-widget.codersrank.io/api/Python",
    "level": "Top 2",
    "role": "Data Scientist",
    "country": "United States"
  },
  {
    "name": "Java",
    "imgLink": "https://icon-widget.codersrank.io/api/Java",
    "level": "Top 3",
    "role": "Software Engineer",
    "country": "India"
  },
  {
    "name": "Go",
    "imgLink": "https://icon-widget.codersrank.io/api/Go",
    "level": "Top 5",
    "role": "Backend Developer",
    "country": "Germany"
  },
  {
    "name": "Ruby",
    "imgLink": "https://icon-widget.codersrank.io/api/Ruby",
    "level": "Top 2",
    "role": "Full-Stack Developer",
    "country": "Japan"
  },
  {
    "name": "TypeScript",
    "imgLink": "https://icon-widget.codersrank.io/api/TypeScript",
    "level": "Top 4",
    "role": "Frontend Developer",
    "country": "Canada"
  },
  {
    "name": "PHP",
    "imgLink": "https://icon-widget.codersrank.io/api/PHP",
    "level": "Top 1",
    "role": "Backend Developer",
    "country": "France"
  },
  {
    "name": "Kotlin",
    "imgLink": "https://icon-widget.codersrank.io/api/Kotlin",
    "level": "Top 3",
    "role": "Mobile Developer",
    "country": "Russia"
  },
  {
    "name": "Swift",
    "imgLink": "https://icon-widget.codersrank.io/api/Swift",
    "level": "Top 1",
    "role": "iOS Developer",
    "country": "United Kingdom"
  },
  {
    "name": "R",
    "imgLink": "https://icon-widget.codersrank.io/api/R",
    "level": "Top 3",
    "role": "Data Analyst",
    "country": "Brazil"
  },
  {
    "name": "Perl",
    "imgLink": "https://icon-widget.codersrank.io/api/Perl",
    "level": "Top 4",
    "role": "Systems Administrator",
    "country": "Netherlands"
  },
  {
    "name": "Rust",
    "imgLink": "https://icon-widget.codersrank.io/api/Rust",
    "level": "Top 2",
    "role": "Systems Engineer",
    "country": "Sweden"
  },
  {
    "name": "Scala",
    "imgLink": "https://icon-widget.codersrank.io/api/Scala",
    "level": "Top 5",
    "role": "Big Data Developer",
    "country": "Italy"
  },
  {
    "name": "Haskell",
    "imgLink": "https://icon-widget.codersrank.io/api/Haskell",
    "level": "Top 1",
    "role": "Research Engineer",
    "country": "Denmark"
  },
  {
    "name": "Dart",
    "imgLink": "https://icon-widget.codersrank.io/api/Dart",
    "level": "Top 2",
    "role": "Mobile Developer",
    "country": "New Zealand"
  },
  {
    "name": "Objective-C",
    "imgLink": "https://icon-widget.codersrank.io/api/Objective-C",
    "level": "Top 3",
    "role": "iOS Developer",
    "country": "South Korea"
  },
  {
    "name": "Shell",
    "imgLink": "https://icon-widget.codersrank.io/api/Shell",
    "level": "Top 4",
    "role": "DevOps Engineer",
    "country": "China"
  },
  {
    "name": "Lua",
    "imgLink": "https://icon-widget.codersrank.io/api/Lua",
    "level": "Top 5",
    "role": "Game Developer",
    "country": "Mexico"
  },
  {
    "name": "Elixir",
    "imgLink": "https://icon-widget.codersrank.io/api/Elixir",
    "level": "Top 3",
    "role": "Backend Developer",
    "country": "Portugal"
  },
  {
    "name": "Elm",
    "imgLink": "https://icon-widget.codersrank.io/api/Elm",
    "level": "Top 5",
    "role": "Frontend Developer",
    "country": "Norway"
  },
  {
    "name": "Erlang",
    "imgLink": "https://icon-widget.codersrank.io/api/Erlang",
    "level": "Top 2",
    "role": "Telecom Engineer",
    "country": "Finland"
  },
  {
    "name": "Julia",
    "imgLink": "https://icon-widget.codersrank.io/api/Julia",
    "level": "Top 4",
    "role": "Data Scientist",
    "country": "Spain"
  },
  {
    "name": "Tcl",
    "imgLink": "https://icon-widget.codersrank.io/api/Tcl",
    "level": "Top 5",
    "role": "Systems Engineer",
    "country": "Israel"
  },
  {
    "name": "F#",
    "imgLink": "https://icon-widget.codersrank.io/api/F%23",
    "level": "Top 1",
    "role": "Functional Programmer",
    "country": "Iceland"
  },
  {
    "name": "Prolog",
    "imgLink": "https://icon-widget.codersrank.io/api/Prolog",
    "level": "Top 3",
    "role": "AI Researcher",
    "country": "Belgium"
  },
  {
    "name": "OCaml",
    "imgLink": "https://icon-widget.codersrank.io/api/OCaml",
    "level": "Top 4",
    "role": "Functional Developer",
    "country": "Switzerland"
  },
  {
    "name": "Fortran",
    "imgLink": "https://icon-widget.codersrank.io/api/Fortran",
    "level": "Top 1",
    "role": "Scientific Programmer",
    "country": "Austria"
  },
  {
    "name": "VB.NET",
    "imgLink": "https://icon-widget.codersrank.io/api/VB.NET",
    "level": "Top 3",
    "role": "Software Developer",
    "country": "South Africa"
  },
  {
    "name": "COBOL",
    "imgLink": "https://icon-widget.codersrank.io/api/COBOL",
    "level": "Top 1",
    "role": "Legacy System Developer",
    "country": "United States"
  },
  {
    "name": "Racket",
    "imgLink": "https://icon-widget.codersrank.io/api/Racket",
    "level": "Top 2",
    "role": "Research Engineer",
    "country": "South Korea"
  },
  {
    "name": "Ada",
    "imgLink": "https://icon-widget.codersrank.io/api/Ada",
    "level": "Top 5",
    "role": "Aerospace Engineer",
    "country": "Germany"
  },
  {
    "name": "Pascal",
    "imgLink": "https://icon-widget.codersrank.io/api/Pascal",
    "level": "Top 1",
    "role": "Embedded Systems Developer",
    "country": "Brazil"
  },
  {
    "name": "Scheme",
    "imgLink": "https://icon-widget.codersrank.io/api/Scheme",
    "level": "Top 3",
    "role": "Researcher",
    "country": "United Kingdom"
  },
  {
    "name": "Nim",
    "imgLink": "https://icon-widget.codersrank.io/api/Nim",
    "level": "Top 4",
    "role": "Systems Developer",
    "country": "Hungary"
  },
  {
    "name": "VHDL",
    "imgLink": "https://icon-widget.codersrank.io/api/VHDL",
    "level": "Top 2",
    "role": "Hardware Engineer",
    "country": "India"
  },
  {
    "name": "Verilog",
    "imgLink": "https://icon-widget.codersrank.io/api/Verilog",
    "level": "Top 3",
    "role": "Embedded Developer",
    "country": "Japan"
  },
  {
    "name": "Zig",
    "imgLink": "https://icon-widget.codersrank.io/api/Zig",
    "level": "Top 5",
    "role": "Systems Engineer",
    "country": "Canada"
  },
  {
    "name": "Crystal",
    "imgLink": "https://icon-widget.codersrank.io/api/Crystal",
    "level": "Top 1",
    "role": "Backend Developer",
    "country": "Argentina"
  },
  {
    "name": "Groovy",
    "imgLink": "https://icon-widget.codersrank.io/api/Groovy",
    "level": "Top 2",
    "role": "Full Stack Developer",
    "country": "Italy"
  }
];

export const technologies = [
  {
    name: "Wpf",
    rank: "Top 0.01%",
    imageUrl: "https://icon-widget.codersrank.io/api/Wpf",
  },
  {
    name: "NodeJS",
    rank: "Top 0.01%",
    imageUrl: "https://icon-widget.codersrank.io/api/NodeJS",
  },
  {
    name: "Echo",
    rank: "Top 0.01%",
    imageUrl: "https://icon-widget.codersrank.io/api/Echo",
  },
  {
    name: "Gulp",
    rank: "Top 0.04%",
    imageUrl: "https://icon-widget.codersrank.io/api/Gulp",
  },
  {
    name: "mongoose",
    rank: "Top 45%",
    imageUrl: "https://icon-widget.codersrank.io/api/mongoose",
  },
  {
    name: "ReactJS",
    rank: "Top 90%",
    imageUrl: "https://icon-widget.codersrank.io/api/ReactJS",
  },
  {
    name: "JUnit",
    rank: "Top 42%",
    imageUrl: "https://icon-widget.codersrank.io/api/JUnit",
  },
  {
    name: "NUnit",
    rank: "Top 55%",
    imageUrl: "https://icon-widget.codersrank.io/api/NUnit",
  },
  {
    name: "Unity3D",
    rank: "Top 76%",
    imageUrl: "https://icon-widget.codersrank.io/api/Unity3D",
  },
];

export const languages = [
  {
    name: "C#",
    experience: "6,955",
    rankWorldwide: "0.01",
    totalWorldwide: "74K",
    scopeWorldwide: "Worldwide",
    rankLocal: "2",
    totalLocal: "68",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/C%23",
  },
  {
    name: "JavaScript",
    experience: "5,909",
    rankWorldwide: "0.01",
    totalWorldwide: "278K",
    scopeWorldwide: "Worldwide",
    rankLocal: "1",
    totalLocal: "195",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/NodeJS",
  },
  {
    name: "HTML",
    experience: "1,694",
    rankWorldwide: "0.01",
    totalWorldwide: "291K",
    scopeWorldwide: "Worldwide",
    rankLocal: "1",
    totalLocal: "190",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/HTML",
  },
  {
    name: "Kotlin",
    experience: "1,676",
    rankWorldwide: "0.01",
    totalWorldwide: "26K",
    scopeWorldwide: "Worldwide",
    rankLocal: "5",
    totalLocal: "22",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/Kotlin",
  },
  {
    name: "Java",
    experience: "765",
    rankWorldwide: "0.2",
    totalWorldwide: "130K",
    scopeWorldwide: "Worldwide",
    rankLocal: "4",
    totalLocal: "89",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/Java",
  },
  {
    name: "C++",
    experience: "808",
    rankWorldwide: "0.09",
    totalWorldwide: "87K",
    scopeWorldwide: "Worldwide",
    rankLocal: "2",
    totalLocal: "79",
    scopeLocal: "Australia",
    imageUrl: "https://icon-widget.codersrank.io/api/C%2B%2B",
  },
];
