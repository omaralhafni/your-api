import { Component } from "react";
import { AiTwotoneSetting, AiOutlineSetting } from "react-icons/ai";
import "./index.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error);
    console.log(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-[92vh] w-screen flex justify-center align items-center relative overflow-hidden">
          <AiTwotoneSetting className="spin-three block w-80 h-80 -mt-3 mr-2 text-[#a1939385] absolute bottom-0 right-10" />
          <AiOutlineSetting className="spin-four block w-80 h-80 -mt-3 mr-2 text-[#a1939385] absolute top-20 left-40" />

          <div className="h-[50vh] bg-white p-1 lg:p-20 rounded drop-shadow-2xl flex flex-col items-center justify-center">
            <div className="w-full h-16 mb-24 relative flex justify-center">
              <AiTwotoneSetting className="spin-one block w-20 h-20 -mt-3 mr-2 text-[#334155]" />
              <AiOutlineSetting className="spin-two block w-28 h-28 text-[#5fb1f4]" />
              <AiTwotoneSetting className="spin-one block w-20 h-20 -mt-14 mr-2 text-[#334155]" />
            </div>
            <h1 className="text-1xl lg:text-3xl font-bold uppercase text-gray-600">
              Something went wrong
            </h1>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
