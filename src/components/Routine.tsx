
function Routine(){
    const slots: string[] = ["08:00-09:20", "09:30-10:50", "11:00-12:20", "12:30-01:50", "02:00-03:20", "03:30-04:50"]
    return(
        <>
        <div className=" border-2 mx-2 max-h-screen">
        Routine
        {slots.map((slot, index) => (
            <div key={index} className=" border my-1">{slot}</div>
        ))}
        </div>
        </>
    )
}

export default Routine