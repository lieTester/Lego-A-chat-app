const useCreateAvatar = () => {
  const makeAvatar = (name) => {
    const colorGenerator = () => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      document.body.style.backgroundColor = "#" + randomColor;
      return "#" + randomColor;
    };

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = colorGenerator();
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = "white";
    context.textAlign = "center";
    context.textBaseline = "middle";
    let letters;
    const nameParts = name.split(" ");
    if (nameParts.length > 1) {
      letters = nameParts[0][0] + name.split(" ")[nameParts.length - 1][0];
    } else {
      letters = nameParts[0][1] + nameParts[0][1];
    }
    context.fillText(letters, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/svg+xml");
  };
  return makeAvatar;
};

export default useCreateAvatar;
