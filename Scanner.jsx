import {Html5QrcodeScanner} from "html5-qrcode";
import {useEffect} from "react";

const Scanner = ({onScanSuccess, onClose}) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: {
        width: 200,
        height: 200,
      },
      fps: 5,
    });
    const success = (data) => {
      scanner.clear();
      onScanSuccess(data);
    };
    const error = (error) => {
      console.warn(error);
    };
    scanner.render(success, error);

    return () => {
      scanner
        .clear()
        .catch((err) => console.error("Failed to clear scanner", err));
    };
  }, [onScanSuccess]);

  return (
    <div className="text-lg align-middle">
      <div id="reader"></div>
      <button
        onClick={onClose}
        className="mt-2 px-4 py-1 bg-red-700 border-0 rounded-lg cursor-pointer text-[#ffffffde]"
      >
        Close
      </button>
    </div>
  );
};

export default Scanner;
