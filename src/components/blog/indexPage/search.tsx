import type { CollectionEntry } from "astro:content";
import React, { useState } from "react";
import "./search.css";

type SearchBarProps = {
  blogPosts: CollectionEntry<"blog">[];
};

export const BlogSearchPage = ({ blogPosts }: SearchBarProps) => {
  const [searchVal, setSearchVal] = useState("");
  const filterBlogPosts = blogPosts.filter((post) => {
    return post.data.title.toLowerCase().includes(searchVal.toLowerCase());
  });
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  return (
    <>
      <div className="blogsearch flex flex-col items-center w-full">
        <div className="input-wrap w-full flex flex-col justify-center items-center text-primary-teal outline-none focus:border-none focus:outline-none bg-transparent">
          <h1 className="text-6xl my-10 font-extrabold">Blog</h1>
          <div className="pt-2 w-1/2 mobile:w-[85%] relative mx-auto text-gray-600">
            <input
              onChange={handleInput}
              className="border-2 w-full border-gray bg-primary-Dark h-10 px-5 pr-16 rounded-lg text-xl focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            ></input>
            <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                xmlSpace="preserve"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
        </div>
        <div className="resultwrapper w-full mt-20 pb-10 weki overflow-x-scroll flex flex-row">
          {filterBlogPosts.length ? (
            filterBlogPosts.map((post) => {
              filterBlogPosts;
              return (
                <>
                  <a
                    key={post.id}
                    className="mx-5"
                    href={`/blog/${post.slug}`}
                    target="_blank"
                  >
                    <div className="card">
                      <div className="card-content h-full relative ">
                        <h3 className="card-title max-h-[80%]">
                          {post.data.title}
                        </h3>
                        <h4 className="card-subtitle text-primary-teal absolute mb-[10%] bottom-0">
                          {post.data.date.toDateString()}
                        </h4>
                      </div>
                    </div>
                  </a>
                </>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-screen">
              {`Did not found any match for ${searchVal}`}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

// function XSearchBar(props) {
//     const [searchVal, setSearchVal] = React.useState('');

//     const handleInput = (e) => {
//       setSearchVal(e.target.value);
//     }

//     const handleClearBtn = () => {
//       setSearchVal('');
//     }

//     const filteredProducts = props.products.filter((product) => {
//       return product.includes(searchVal);
//     });

//     return (
//       <div className='container'>

//         <div className="results-wrap">
//           <ul>
//             {filteredProducts.map((product) => {
//               return <li key={product} className='list-item'><a href='#'>{product}</a></li>
//             })}
//           </ul>
//         </div>
//       </div>
//     );
//   }
