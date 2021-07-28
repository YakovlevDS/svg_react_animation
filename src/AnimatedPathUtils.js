export const getPathLength = data => {
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  path.setAttribute("d", data);

  return path.getTotalLength();
};

export const splitPath = (pathsArray, delimiters = ["M", "m"]) => {
  const index = delimiters.reduce(
    (result, delimiter) =>
      Math.max(result, pathsArray[0].lastIndexOf(delimiter)),
    -1
  );

  return index !== -1
    ? splitPath(
        [
          pathsArray[0].substr(0, index - 1),
          pathsArray[0].substr(index)
        ].concat(pathsArray.slice(1)),
        delimiters
      )
    : pathsArray.filter(item => item.length);
};
