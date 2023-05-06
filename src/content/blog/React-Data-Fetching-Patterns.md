---
title: React Data Fetching Patterns
discerption: This blog post is an in-depth exploration of React data fetching patterns, covering common approaches and libraries such as useEffect, useReducer, React Query, SWR, and Redux. The post discusses the pros and cons of each approach and provides code examples to help readers get started. The goal is to provide full-stack developers with a comprehensive understanding of data fetching in React to build performant and responsive applications.
author: subrat gupta
draft: false
tags: ["react-query", "swr", "react", "data-fetching"]

date: 2023-05-05
---

When building web applications with React, data fetching is a critical task that often requires careful planning and consideration. In this blog post, we'll explore some common data fetching patterns and best practices for working with data in React applications.

## Overview of Data Fetching in React

Before we dive into specific data fetching patterns, it's important to have a high-level understanding of how data fetching works in React.

In a typical React application, data is fetched from an external data source, such as a REST API, GraphQL server, or database. This data is then passed down as props to child components, where it can be rendered and manipulated.

The process of fetching data can be triggered in a variety of ways, such as when the component first mounts, in response to user input, or when the application state changes. Depending on the specific use case, different data fetching patterns and techniques may be appropriate.

## Basic Data Fetching with `useEffect`

One of the most common ways to fetch data in a React application is by using the `useEffect` hook. `useEffect` allows you to perform side effects, such as fetching data, when a component is mounted or updated.

Here's an example of fetching data using `useEffect`:

```jsx
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

In this example, we use `useState` to create a state variable `data` that initially contains an empty array. We then use `useEffect` to fetch data from an external API and update the `data` state variable.

Note that we pass an empty dependency array as the second argument to `useEffect`. This tells React to only run the effect once, when the component is mounted.

## Handling Loading and Error States

When fetching data in a React application, it's important to handle loading and error states to provide a better user experience. Here's an example of how to handle loading and error states using the `useState` hook:

```jsx
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

In this example, we use `useState` to create state variables for `isLoading` and `error`. We also update these variables when fetching data using `useEffect`.

Finally, we check the `isLoading` and `error` states before rendering the data. If the `isLoading` state is `true`, we render a loading message. If the `error` state is not `null`, we render an error message.

## Fetching Data

## Fetching Data on User Interaction

Sometimes, you may want to fetch data in response to user interaction, such as when a button is clicked. In this case, you can use an event handler function to trigger the data fetching.

Here's an example of fetching data in response to a button click:

```jsx
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = () => {
    setIsLoading(true);

    fetch("https://example.com/api/data")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <button onClick={handleClick}>Fetch Data</button>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
```

In this example, we use `useState` to create state variables for `isLoading` and `error`. We also define an event handler function `handleClick` that triggers the data fetching when a button is clicked.

Note that we set the `isLoading` state to `true` before fetching the data, and set it back to `false` after the data has been fetched. We also set the `error` state if there is an error during the data fetching.

## Fetching Data Based on Application State

Another common use case for data fetching in React is fetching data based on the application state. For example, you may want to fetch data when a certain value changes or when the user navigates to a different page.

In this case, you can use the `useEffect` hook with a dependency array that includes the relevant state variables.

Here's an example of fetching data based on application state:

```jsx
import { useState, useEffect } from "react";

function App() {
  const [category, setCategory] = useState("all");
  const [data, setData] = useState([]);

  useEffect(() => {
    let url = "https://example.com/api/data";

    if (category !== "all") {
      url += `?category=${category}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <select value={category} onChange={handleCategoryChange}>
        <option value="all">All</option>
        <option value="category1">Category 1</option>
        <option value="category2">Category 2</option>
      </select>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}
```

In this example, we use `useState` to create a state variable for `category`. We then use `useEffect` with a dependency array that includes the `category` variable to fetch data based on the selected category.

Note that we modify the URL to include the `category` parameter if the selected category is not `all`.

## Data Fetching with Third-Party Libraries

While using the `useEffect` hook is a simple and effective way to fetch data in React, there are also several third-party libraries available that can simplify the process even further.

### React Query

React Query is a popular library for data fetching in React. It provides a simple and flexible API for fetching, caching, and updating data in your React components.

To use React Query, you first need to install it:

```
npm install react-query
```

Here's an example of using React Query to fetch data:

```jsx
import { useQuery } from "react-query";

function App() {
  const { isLoading, error, data } = useQuery("data", () =>
    fetch("https://example.com/api/data").then((response) => response.json())
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

In this example, we use the `useQuery` hook from React Query to fetch data. We provide a unique key (`data`) to identify the query, and a function that returns the data.

React Query automatically caches the data and updates it when necessary. It also provides several advanced features, such as data refetching, pagination, and optimistic updates.

### SWR

SWR is another popular library for data fetching in React. It provides a lightweight and fast solution for handling data fetching and caching.

To use SWR, you first need to install it:

```
npm install swr
```

Here's an example of using SWR to fetch data:

```jsx
import useSWR from "swr";

function App() {
  const { data, error } = useSWR("https://example.com/api/data", (url) =>
    fetch(url).then((response) => response.json())
  );

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

In this example, we use the `useSWR` hook from SWR to fetch data. We provide the URL as the first argument, and a function that returns the data as the second argument.

SWR also automatically caches the data and updates it when necessary. It provides several advanced features, such as polling, revalidation, and error retrying.

## Conclusion

In this blog post, we've explored several patterns for fetching data in React. We've seen how to fetch data on component mount, on user interaction, and based on application state.

We've also looked at two popular third-party libraries for data fetching in React: React Query and SWR.

By using these patterns and libraries, you can simplify your data fetching code, improve performance, and provide a better user experience for your React applications. It's important to choose the right pattern and library for your use case, based on factors such as the complexity of your data, the frequency of updates, and the performance requirements of your application.

Remember, data fetching is a critical part of building any React application, and it's important to approach it thoughtfully and carefully.

## References

- [React Docs - Fetching Data with AJAX](https://reactjs.org/docs/faq-ajax.html)
- [React Query Docs](https://react-query.tanstack.com/)
- [SWR Docs](https://swr.vercel.app/)

## Appendix

Here are some additional code snippets that illustrate different data fetching patterns in React:

### on component mount using `useEffect`

```jsx
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://example.com/api/data");
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### on user interaction

```jsx
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://example.com/api/data?q=${query}`);
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    if (query) {
      fetchData();
    }
  }, [query]);

  function handleInputChange(event) {
    setQuery(event.target.value);
  }

  return (
    <div>
      <input type="text" value={query} onChange={handleInputChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### based on application state

```jsx
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://example.com/api/data?filter=${filter}`
        );
        const data = await response.json();
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    }

    fetchData();
  }, [filter]);

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  return (
    <div>
      <input type="text" value={filter} onChange={handleFilterChange} />
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### with React Query

```jsx
import { useQuery } from "react-query";

function App() {
  const { data, error, isLoading } = useQuery("data", async () => {
    const response = await fetch("https://example.com/api/data");
    return response.json();
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### with SWR

```jsx
import useSWR from "swr";

function App() {
  const { data, error } = useSWR(
    "https://example.com/api/data",
    async (url) => {
      const response = await fetch(url);
      return response.json();
    }
  );

  if (!data) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

### with Redux

```jsx
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "./actions";

function App() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## Conclusion

React data fetching patterns are an important consideration for building performant and responsive applications. In this article, we covered some common patterns and libraries for fetching data in React, including `useEffect`, `useReducer`, `React Query`, `SWR`, and `Redux`. We also explored the pros and cons of each approach, and provided some code examples to help you get started. Remember, the right pattern and library for your application will depend on your specific use case, so take the time to carefully evaluate your options and choose the best approach for your needs.
