import { useRef } from "react"


export const C_DELAY_DEFAULT = 500;

const useDebounce = () => {
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null)
    const debounce = (func: ()=>void, delay: number) => {
        if(debounceTimeout.current) 
            clearTimeout(debounceTimeout.current)

        debounceTimeout.current = setTimeout(()=>{
            func();
            debounceTimeout.current = null;
        }, delay)
    }

    return debounce;
}
export default useDebounce;