
const Image = ({ image, onUpdate }: { image: string, onUpdate: any }) => {

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        onUpdate(base64String);
        //localStorage.setItem('savedImage', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    onUpdate("");
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className=" border-gray-300 rounded-lg p-4">
        {image !== "" ? (
          <div className="relative">
            <img
              src={image}
              alt="Selected"
              className="w-full h-64 object-cover rounded-lg"
            />
            <button
              onClick={handleRemoveImage}
              className="absolute top-1 right-1 bg-red-700 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <label className="cursor-pointer">
              <div className="flex flex-col items-center justify-center h-64">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="mt-2 text-sm text-gray-600">
                  Click to select an image
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};

export default Image;