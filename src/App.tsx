import { ChevronDownIcon } from "@heroicons/react/16/solid";
import "./App.css";
import Navbar from "./layout/navbar";
import { districtOptions, municipalitiesOptions, neighborhoodsOptions, propertyTypeOptions } from "./utils/constants";
import Select from "react-select";
import LocationPicker from "./component/locationPicker";

function App() {
    return (
        <div className="flex flex-col h-screen w-screen">
            <div className="flex justify-center items-center flex-col">
                <img src={"src/assets/bcn.jpg"} className="bg-cover w-full h-[25vh] object-cover bg-bottom" alt="Vite logo" />
            </div>
            <Navbar />
            <div className="w-full flex flex-col h-full p-5">
                <div className="border-b border-gray-900/10 pb-12 sm:mx-5 lg:mx-30">
                    <h2 className="text-base/7 font-semibold text-gray-900">Price Recomendation</h2>
                    <p className="mt-1 text-sm/6 text-gray-600"></p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                            <LocationPicker />
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="propertyType" className="block text-sm/6 font-medium text-gray-900">
                                Property type
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <Select options={propertyTypeOptions} />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="operation" className="block text-sm/6 font-medium text-gray-900">
                                Operation
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="operation"
                                    name="operation"
                                    autoComplete="property-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required>
                                    <option value="sale">Sale</option>
                                    <option value="rent">Rent</option>
                                </select>
                                <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                            </div>
                        </div>
                        <div className="sm:col-span-3">
                            <label htmlFor="size" className="block text-sm/6 font-medium text-gray-900">
                                Size (m2)
                            </label>
                            <div className="mt-2">
                                <input
                                    id="size"
                                    name="size"
                                    type="text"
                                    min={1}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="rooms" className="block text-sm/6 font-medium text-gray-900">
                                Rooms
                            </label>
                            <div className="mt-2">
                                <input
                                    id="rooms"
                                    name="rooms"
                                    type="number"
                                    min={0}
                                    autoComplete="given-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="bathrooms" className="block text-sm/6 font-medium text-gray-900">
                                Bathrooms
                            </label>
                            <div className="mt-2">
                                <input
                                    id="bathrooms"
                                    name="bathrooms"
                                    min={0}
                                    type="number"
                                    autoComplete="family-name"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    required
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm/6 font-medium text-gray-900">
                                Status
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="operation"
                                    name="operation"
                                    autoComplete="property-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option value="good">Good</option>
                                    <option value="renew">Renew</option>
                                    <option value="newdevelopment">New development</option>
                                </select>
                                <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="neighborhood" className="block text-sm/6 font-medium text-gray-900">
                                Neighborhood
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <Select options={neighborhoodsOptions} />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="municipality" className="block text-sm/6 font-medium text-gray-900">
                                Municipality
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <Select options={municipalitiesOptions} />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="district" className="block text-sm/6 font-medium text-gray-900">
                                District
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <Select options={districtOptions} />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="province" className="block text-sm/6 font-medium text-gray-900">
                                Province
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="province"
                                    name="province"
                                    autoComplete="property-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option key={0} value={0}>
                                        Barcelona
                                    </option>
                                </select>
                                <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="property-type"
                                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline -outline-offset-1 outline-gray-300 focus:outline focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                    <option key={"spain"} value={0}>
                                        Spain
                                    </option>
                                </select>
                                <ChevronDownIcon aria-hidden="true" className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4" />
                            </div>
                        </div>

                        <div className="sm:col-span-3 flex flex-col">
                            <div className="flex">
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor={`newDevelopment`} className="select-none font-medium text-gray-900">
                                        Is new development
                                    </label>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id={`newDevelopment`}
                                            name={`newDevelopment`}
                                            type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                                            <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor={`exterior`} className="select-none font-medium text-gray-900">
                                        Has exterior
                                    </label>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id={`exterior`}
                                            name={`exterior`}
                                            type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                                            <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="min-w-0 flex-1 text-sm/6">
                                    <label htmlFor={`hasLift`} className="select-none font-medium text-gray-900">
                                        Has lift
                                    </label>
                                </div>
                                <div className="flex h-6 shrink-0 items-center">
                                    <div className="group grid size-4 grid-cols-1">
                                        <input
                                            id={`hasLift`}
                                            name={`hasLift`}
                                            type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 14 14"
                                            className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25">
                                            <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:checked]:opacity-100" />
                                            <path d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="opacity-0 group-has-[:indeterminate]:opacity-100" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
