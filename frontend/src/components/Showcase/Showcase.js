import { useState, useEffect } from "react";

const ShowCase = (props) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await fetch(props.BaseUri);
            const json = await response.json();

            if (response.ok) {
                setData(json);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            {items ? (
                <div className="showcase">
                    {data.map(item => (
                        <ItemDetails item={item} key={item._id} />
                    ))}{" "}
                </div>
            ) : (
                <span className="loader"></span>
            )}


        </div >
    );
}

export default ShowCase;