function Days(){
    const week: string[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];

    return(
        <>
        <div className="flex content-center justify-between border-2 my-8 mx-1.5  ">
            {week.map((day, index) => (
                <div className=" text-center p-1.5 border-2" key={index}>
                    {day}
                </div>
            ))}
        </div>
        </>
    )

}

export default Days