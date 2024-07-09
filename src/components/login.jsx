
import loginMan from '../assets/loginMan.png';

const Login = () => {
    return (
        <div className="flex h-screen">
            {/* Left Side */}
            <div className="w-1/2 bg-primary flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-white">WELCOME</h1>
                    <p className="text-xl text-white mt-2">Login to Eventix</p>
                </div>
                <img src={loginMan} alt="Login" className="mt-10 w-64 h-64 object-cover" />
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-gray-900 flex flex-col justify-center px-10">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="username" className="block text-white text-sm mb-2">User Name</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                            defaultValue="2021cs100@stu.ucsc.cmb.ac.lk"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-white text-sm mb-2">Password</label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded"
                            />
                            <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 cursor-pointer">
                                👁️
                            </span>
                        </div>
                    </div>

                    <button className="w-full bg-lime-600 text-black py-2 rounded font-bold hover:bg-lime-700">LOGIN</button>

                    <div className="flex justify-center">
                        <button className="w-full bg-transparent border border-lime-600 text-lime-600 py-2 rounded font-bold hover:bg-lime-700 hover:text-black">Signup</button>
                    </div>

                    <div className="text-right">
                        <a href="#" className="text-sm text-lime-600 hover:underline">Forgot password?</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
