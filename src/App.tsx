import Header from './header'
import { useEffect } from 'react'
import { getRoutineById } from './db'


function App() {

useEffect(() => {
const getRoutine = async () =>{
const routine = await getRoutineById();
console.log(routine);
}
getRoutine();
})

  return (
   <div className='bg-[#09090b] h-full p-2'>
      <Header/>
      <div className=' text-amber-50'>
        Hello world 
      </div>
    </div>
  )
}

export default App
