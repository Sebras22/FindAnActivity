import { useState, createRef } from "react";
import "./App.css";

function App() {
    const [data, setData] = useState({});
    const [userdata, setUserdata] = useState({});
    const inputRef = createRef();

    const table = {
        education: 5,
        social: 8,
        recreational: 4,
        diy: 1,
        charity: 1,
        cooking: 3,
        relaxation: 1,
        music: 1,
        busywork: 1,
    };

    const getData = async () => {
        const url = new URL("https://www.boredapi.com/api/activity/");
        Object.keys(userdata).forEach((key) => {
            url.searchParams.set(key, userdata[key]);
        });
        const response = await fetch(url);
        const res = await response.json();
        setData(res);
    };

    const Clear = () => {
        inputRef.current.value = null;
        setData({});
    };
    console.log(data);
    console.log("COUCOU", userdata);
    console.log(!!data.activity);
    return (
        <>
            <div className="All">
                <div className="info">
                    <div className="Number">
                        <div className="Titre">Number of participants</div>
                        <input
                            required
                            max={table[userdata.type]}
                            className="inputNumber"
                            ref={inputRef}
                            min={1}
                            placeholder="Number of participants"
                            type="number"
                            onChange={(e) =>
                                setUserdata((old) => {
                                    return {
                                        ...old,
                                        participants: e.target.value,
                                    };
                                })
                            }
                        />
                    </div>
                    <div className="Price">
                        <div className="Titre">Price</div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e) =>
                                setUserdata((old) => {
                                    return {
                                        ...old,
                                        price: e.target.value,
                                    };
                                })
                            }
                        ></input>
                        <div>{userdata.price}</div>
                    </div>
                    <div className="Accessibility">
                        <div className="Titre">Accessibility</div>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.1}
                            onChange={(e) =>
                                setUserdata((old) => {
                                    return {
                                        ...old,
                                        accessibility: e.target.value,
                                    };
                                })
                            }
                        ></input>
                        <div>{userdata.accessibility}</div>
                    </div>
                    <div className="Typeof">
                        <div className="Titre">Type of activity</div>
                        <select
                            className="inputType"
                            onChange={(e) =>
                                setUserdata((old) => {
                                    if (
                                        inputRef.current.value >
                                        table[e.target.value]
                                    ) {
                                        inputRef.current.value =
                                            table[e.target.value];
                                    }
                                    return { ...old, type: e.target.value };
                                })
                            }
                        >
                            <option value="education">education</option>
                            <option value="recreational">recreational</option>
                            <option value="social">social</option>
                            <option value="diy">diy</option>
                            <option value="charity">charity</option>
                            <option value="cooking">cooking</option>
                            <option value="relaxation">relaxation</option>
                            <option value="music">music</option>
                            <option value="busywork">busywork</option>
                        </select>
                        {/* <input
                            required
                            className="inputType"
                            ref={clearRef}
                            placeholder="Type of activity"
                            type="text"
                            onClick={(e) =>
                                setUserdata((old) => {
                                    return { ...old, type: e.target.value };
                                })
                            }
                        ></input> */}
                        <button className="search" onClick={getData}>
                            <img src="./assets/search.svg" alt="" />
                        </button>
                    </div>
                    <button className="Clear" onClick={Clear}>
                        Clear
                    </button>
                </div>
                {data.activity == null ? null : (
                    <div className="Result">
                        <div className="Card">Activity : {data.activity}</div>
                        <div className="Card">Type : {data.type}</div>
                        <div className="Card">
                            Participants : {data.participants}
                        </div>
                        <div className="Card">Price : {data.price}</div>
                        <div className="Card">
                            Level of accessibility : {data.accessibility}
                        </div>
                        {data.link !== "" ? (
                            <div className="Card">Link : {data.link}</div>
                        ) : null}
                    </div>
                )}
                <div className="Error">{data.error}</div>
            </div>
        </>
    );
}

export default App;
