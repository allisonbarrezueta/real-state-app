import Select from "react-select";
import { neighborhoodsOptions } from "../../utils/constants";
import { useEffect, useState } from "react";
import { getOptionsFields, getPriceRecomendation, Options, OptionsFields } from "../../services/housing";

const Predictive = () => {
    // const [location] = useState({
    //     lat: 41.3851,
    //     lng: 2.1734,
    //     city: "",
    //     neighborhood: "",
    //     district: "",
    // });

    const [options, setOptions] = useState<Record<string, Options[]>>();
    const [price, setPrice] = useState<number>();

    const loadOptions = async () => {
        const propertyTypeOptions = await getOptionsFields(OptionsFields.PROPERTY_TYPE);
        const operationOptions = await getOptionsFields(OptionsFields.OPERATION);
        const exteriorOptions = await getOptionsFields(OptionsFields.EXTERIOR);
        const provinceOptions = await getOptionsFields(OptionsFields.PROVINCE);
        const municipalitiesOptions = await getOptionsFields(OptionsFields.MUNICIPALITY);
        const districtOptions = await getOptionsFields(OptionsFields.DISTRICT);
        const neighborhoodOptions = await getOptionsFields(OptionsFields.NEIGHBORHOOD);
        const statusOptions = await getOptionsFields(OptionsFields.STATUS);
        const newDevelopmentOptions = await getOptionsFields(OptionsFields.NEW_DEVELOPMENT);
        const hasLiftOptions = await getOptionsFields(OptionsFields.HAS_LIFT);

        return {
            propertyTypeOptions,
            operationOptions,
            exteriorOptions,
            provinceOptions,
            municipalitiesOptions,
            districtOptions,
            neighborhoodOptions,
            statusOptions,
            newDevelopmentOptions,
            hasLiftOptions,
        };
    };

    useEffect(() => {
        const fetchData = async () => {
            const loadedOptions = await loadOptions();
            setOptions(loadedOptions);
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        const operation = data.operation as string;
        if (!operation) {
            alert("Operation field is required");
            return;
        }
        const hasLift = data.hasLift === "on" ? options?.hasLiftOptions.find((option) => option.label == "True")?.value : options?.hasLiftOptions.find((option) => option.label == "False")?.value;
        const exterior = data.exterior === "on" ? options?.exteriorOptions.find((option) => option.label == "True")?.value : options?.exteriorOptions.find((option) => option.label == "False")?.value;
        const newDevelopment =
            data.newDevelopment === "on"
                ? options?.newDevelopmentOptions.find((option) => option.label == "True")?.value
                : options?.newDevelopmentOptions.find((option) => option.label == "False")?.value;

        const body = {
            propertyType: parseInt(data.propertyType as string),
            operation: parseInt(data.operation as string),
            size: parseInt(data.size as string),
            exterior,
            rooms: parseInt(data.rooms as string),
            bathrooms: parseInt(data.bathrooms as string),
            province: parseInt(data.province as string),
            municipality: parseInt(data.municipality as string),
            district: parseInt(data.district as string),
            neighborhood: parseInt(data.neighborhood as string),
            status: parseInt(data.status as string),
            hasLift,
            priceByArea: parseInt(String(data.priceByArea ?? "0")),
            newDevelopment,
        };
        console.log({ body });
        const response = await getPriceRecomendation(body);

        setPrice(Number(response.price));
        console.log("Form submitted", response);
    };

    return (
        <form className="border-b border-gray-900/10 pb-12 sm:mx-5 lg:mx-30" onSubmit={handleFormSubmit}>
            {!price ? (
                <h2 className="text-base/7 font-semibold text-gray-900">Price Recomendation</h2>
            ) : (
                <h2 className="text-base/7 font-semibold text-gray-900">
                    Price Recomendation: <span className="font-bold">€ {price.toFixed(2)}</span>
                </h2>
            )}
            <p className="mt-1 text-sm/6 text-gray-600"></p>

            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                {/* <div className="sm:col-span-6">
                    <LocationPicker setLocation={setLocation} />
                </div> */}
                <div className="sm:col-span-3">
                    <label htmlFor="propertyType" className="block text-sm/6 font-medium text-gray-900">
                        Property type
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <Select name="propertyType" required options={options?.propertyTypeOptions} />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="operation" className="block text-sm/6 font-medium text-gray-900">
                        Operation
                    </label>

                    <div className="mt-2 grid grid-cols-1">
                        <Select name="operation" required options={options?.operationOptions} />
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
                            min={1}
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
                        <Select name="status" required options={options?.statusOptions} />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="neighborhood" className="block text-sm/6 font-medium text-gray-900">
                        Neighborhood
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <Select name="neighborhood" required options={neighborhoodsOptions} />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="municipality" className="block text-sm/6 font-medium text-gray-900">
                        Municipality
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <Select name="municipality" required options={options?.municipalitiesOptions} />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="district" className="block text-sm/6 font-medium text-gray-900">
                        District
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <Select name="district" required options={options?.districtOptions} />
                    </div>
                </div>

                <div className="sm:col-span-3">
                    <label htmlFor="province" className="block text-sm/6 font-medium text-gray-900">
                        Province
                    </label>
                    <div className="mt-2 grid grid-cols-1">
                        <Select name="province" required options={options?.provinceOptions} />
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
                <div className="sm:col-span-6 flex justify-center">
                    <button>Calculate</button>
                </div>
            </div>
        </form>
    );
};

export default Predictive;
