// Function to get embedding from video URL
export const extractVideoID = (url) => {
  console.log(url);
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
  let match = url.match(regExp);
  if (match && match[7].length == 11) {
    console.log(match[7]);
    return match[7];
  } else {
    // Failsafe in case conversion does not work
    return "klvm6dpuS_A";
  }
};
