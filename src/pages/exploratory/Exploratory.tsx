const Exploratory = () => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            {/* <h1 className="text-3xl font-bold text-center">Exploratory Data Analysis</h1> */}
            <iframe
                width="600"
                height="450"
                src="https://lookerstudio.google.com/embed/reporting/b099c8b7-831e-4ecc-ab9a-9b5a1e895b58/page/p_qkphmsklrd"
                className="w-full h-full"
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"></iframe>
        </div>
    );
};

export default Exploratory;
