import { Dialog, DialogBackdrop, DialogPanel, PopoverGroup } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/16/solid";
import { useState } from "react";

const navigation = {
    pages: [
        { name: "Predictive", href: "/" },
        { name: "Stats", href: "stats" },
        { name: "Exploratory", href: "exploratory" },
    ],
};

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                <DialogBackdrop transition className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0" />

                <div className="fixed inset-0 z-40 flex">
                    <DialogPanel
                        transition
                        className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full">
                        <div className="flex px-4 pb-2 pt-5">
                            <button type="button" onClick={() => setOpen(false)} className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400">
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                            {navigation.pages.map((page) => (
                                <div key={page.name} className="flow-root">
                                    <a href={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                        {page.name}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            <header className="relative">
                <nav aria-label="Top">
                    {/* Secondary navigation */}
                    <div className="bg-white">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="border-b border-gray-200">
                                <div className="flex h-16 items-center justify-between">
                                    {/* Logo (md+) */}
                                    <div className="hidden md:flex md:flex-1 md:items-center">
                                        <a href="#">
                                            <span className="sr-only">Your Company</span>
                                            <img alt="" src="src/assets/EAEBSB_LOGO.png" className="h-8 w-auto" />
                                        </a>
                                    </div>

                                    <div className="hidden h-full md:flex">
                                        {/* Flyout menus */}
                                        <PopoverGroup className="inset-x-0 bottom-0 px-4">
                                            <div className="flex h-full justify-center space-x-8">
                                                {navigation.pages.map((page) => (
                                                    <a key={page.name} href={page.href} className="flex items-center text-sm font-medium text-amber-700 hover:text-amber-800">
                                                        {page.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </PopoverGroup>
                                    </div>

                                    {/* Mobile menu and search (md-) */}
                                    <div className="flex flex-1 items-center md:hidden">
                                        <button type="button" onClick={() => setOpen(true)} className="-ml-2 rounded-md bg-white p-2 text-gray-400">
                                            <span className="sr-only">Open menu</span>
                                            <Bars3Icon aria-hidden="true" className="size-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;
