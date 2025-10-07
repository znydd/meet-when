function Days(){
    const week: string[] = ["SAT", "SUN", "MON", "TUE", "WED", "THU"];

    return(
        <>
        <div className="flex content-center border rounded-lg my-8 mx-2 ">

            {week.map((day, index) => {
                if(index == 0){
                    return (
                <div key={index} className="text-center p-4 xs:p-2 border w-1/6 rounded-l-lg">
                    {day}
                </div>
                    )
                } else if(index == 5){
                    return(
                <div key={index} className="text-center p-4 xs:p-2 border w-1/6 rounded-r-lg">
                    {day}
                </div>
                    )
                }else{
                    return(
                <div key={index} className="text-center p-4 xs:p-2 border w-1/6">
                    {day}
                </div>

                    )
                }
}
            )}
        </div>
        </>
    )

}

export default Days