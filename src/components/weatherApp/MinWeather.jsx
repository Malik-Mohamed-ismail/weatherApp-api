import { useState,  useEffect } from 'react'
import './Weather.css'
import imgHeader from '../../assets/atmospheric-conditions.png'



export default function MinWeather() {
    const [myCity, setMyCity] = useState('');
    const [data, setData] = useState(null)
    const [error, setError] = useState('');
    console.log(data)
    
    // API kRY::
    // 7ab9ab787c8c44f4a33183355251903 
    const links = `http://api.weatherapi.com/v1/current.json?key=7ab9ab787c8c44f4a33183355251903&q=${myCity}&aqi=no`

    function addMyCity(formData) {
        const city = formData.get('city');
        if (city.length === 0) return;
        setMyCity(city);
    }

  useEffect(() => {
   async function getOurCity() {
        try {
           const res =  await fetch(links)
           if (!res.ok) {
           return  setError('the is smashing Wrong or  writ  city wong')
           }else{
               const result = await res.json()
               setData(result)
               setError('')
           }
        } catch (error) {
            if (error) {
                return  setError('the is smashing Wrong or  writ  city wong')
            }
        }
           
    }
    if(!myCity.length ==0){
        getOurCity()
    }

  },[myCity])
    

   
    
return (
    <div className="MinWeather">
        <header className='header'>
            <p>Weather App</p> 
            <div className="img-header"><img src={imgHeader} alt="this img header weather" /></div>
        </header>

        <main className='main'>
        <form action={addMyCity} className='form'>
            {/* <label htmlFor="city">City Name:</label> */}
            <input type="text" name='city' placeholder='Enter Your City Name:'/>
            <button>Submit</button>
        </form>
   { error && <div className='err'>
        {error && <p>{error}</p>}
    </div>}
                
        <table>
            <thead>
                <tr>
                    <th colSpan="2">Wether Details</th>
                </tr>
            </thead>
                <tbody>
                    <tr>
                        <td className='td-head'>name:</td>
                        {data  ? <td>{ data.location.name}</td> : <td>null</td> || error && <td>null</td> }
                    </tr>
                    <tr>
                        <td className='td-head'>country:</td>
                        {data ? <td>{data.location.country}</td> : <td>null</td>}
                    </tr>
                    <tr>
                        <td className='td-head'>tz_id:</td>
                        {data ? <td>{data.location.tz_id}</td> : <td>null</td>}
                    </tr>
                    <tr>
                        <td className='td-head'>local time:</td>
                        { data ? <td>{data.location.localtime}</td> : <td>null</td>}
                    </tr>
                    <tr>
                        <td className='td-head'>Temp_C:</td>
                        { data ? <td>{data.current.temp_c}</td> : <td>null</td>}
                    </tr>
                    <tr>
                        <td className='td-head'>condition:</td>
                        {data ? <td >
                            <div className='condition'>
                                <span>{data.current.condition.text}</span>
                                <img src={data.current.condition.icon} alt={data.current.condition.text} />
                            </div>
                        </td> : <td>null</td> }
                    </tr>
                </tbody>
        </table>
        
        </main>
        
    </div>
)
}
