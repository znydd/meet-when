
function Navbar({ addRoutine }: { addRoutine: (isClicked: boolean) => void }) {
    return (
        <>
            <div className=" flex-col mx-1.5 mt-3">
                <button className=" w-full text-center py-3 border rounded-xl" onClick={() => addRoutine(true)}>
                    +
                </button>
                <p className=" text-center mt-1 ">
                    Add Routine
                </p>
            </div>
        </>
    )
}

export default Navbar