import ArtItem from "./ArtItem";
import Price from "./Price";
import SmallImage from "./SmallImage";

const ArtList = ({items, setItem}) => {
    return (
        <div className="flex flex-row flex-wrap justify-evenly overflow-y-auto overscroll-contain">
            {
                items.length
                ? items.map(item => {
                    return (<ArtItem item={item} onClick={() => setItem(item)}>
                        <SmallImage href={item.uri} alt={item.title}/>
                        <div className="self-center truncate">{item.title}</div>
                        <Price price={item.price} />
                    </ArtItem>)
                })
                : ""
            }
        </div>
    );
}

export default ArtList;