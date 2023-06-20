import Button from "./Button";
import Image from "./Image";
import Price from "./Price";

const ArtForm = ({item}) => {
    return (
        <div className="flex flex-row mt-5">
            <div className="ml-28 w-96 h-96 border-2 rounded-md shadow-md shadow-gray-500 bg-white">
                <Image href={item.uri} alt={item.title}/>
            </div>
            <div className="ml-10 flex flex-col justify-between">
                <div>
                    <div className="mb-2"><strong>Title:</strong> {item.title}</div>
                    <div className="mb-2"><strong>Price: </strong><Price price={item.price}/></div>
                    <div className="mb-2"><strong>Owner: </strong>{item.owner}</div>
                    <div className="mb-2"><strong>Date of creation</strong>{item.date_of_creation}</div>
                </div>
                <div className="self-start mb-10">
                    <Button>Buy Art</Button>
                </div>
            </div>
        </div>
    )
}

export default ArtForm;