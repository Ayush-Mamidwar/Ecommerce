import React from 'react';

const Loader = () => {
  return (
    <div class='flex space-x-2 justify-center items-center  h-screen '>
 	<span class='sr-only'>Loading...</span>
  	<div class='h-8 w-8 bg-[#1b1b1b] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
	<div class='h-8 w-8 bg-[#1b1b1b] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
	<div class='h-8 w-8 bg-[#1b1b1b] rounded-full animate-bounce'></div>
</div>
  );
};

export default Loader;
