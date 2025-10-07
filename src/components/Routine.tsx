
function Routine(){
    const slots: string[] = ["08:00 - 09:20", "09:30 - 10:50", "11:00 - 12:20", "12:30 - 01:50", "02:00 - 03:20", "03:30 - 04:50"]
    return(
        <>
        <div className=" border rounded-xl mx-2 p-1">
            <h6 className=" ml-2"> 
        Routine
            </h6>
        {slots.map((slot, index) => (
            <div key={index} className=" border rounded-xl my-1 mx-1 h-20 p-1 ">{slot}</div>
        ))}
        </div>
        </>
    )
}

export default Routine