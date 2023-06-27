import { useNavigate } from "react-router-dom";
import ArtItem from "./ArtItem";
import Price from "./Price";
import SmallImage from "./SmallImage";
import Web3 from "web3";

const ArtList = ({ items }) => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        navigate(`/item`, { state: { isNew: false, item: { ...item } } })
    }

    return (
        <div className="flex flex-row flex-wrap justify-evenly overflow-y-auto overscroll-contain">
            {
                items.length
                    ? items.map(item => {
                        return (<ArtItem key={item.id} item={item} onClick={() => handleClick(item)}>
                            <SmallImage src={item.uri} alt={item.title} />
                            <div className="self-center truncate">{item.title}</div>
                            <Price>{Web3.utils.fromWei(parseInt(item.price), 'ether')} ETH</Price>
                        </ArtItem>)
                    })
                    : ""
            }
        </div>
    );
}

export default ArtList;