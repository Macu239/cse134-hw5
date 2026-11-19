module.exports = function (eleventyConfig) {
  // copy these folders to _site as-is (Eleventy doesn't process CSS/images)
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/js");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes", // relative to input -> src/_includes
    },
  };
};
