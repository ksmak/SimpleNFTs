import { useMemo } from "react"

export const useFilterArts = (items, owner) => {
    const filterArts = useMemo(() => {
        let arr = [];
        items.forEach(item => {
            if (owner) {
                if (item.owner === owner) {
                    let el = { ...item };
                    arr.push(el);
                }
            } else if (parseInt(item.status) === 0) {
                let el = { ...item };
                arr.push(el);
            }
        });

        return arr;
    }, [items, owner]);

    return filterArts;
}