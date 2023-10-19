import React from 'react'
import 
{ BsFillArchiveFill,  BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import '../App.css'

function Home() {

    const data = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
     

  return (
    <main className='main-container pt-2' >
        <div className='main-cards'>

        <div className='card'>
                <div className='card-inner'>
                    <h3>EMPLOYEE</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>SHOPS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
           
            <div className='card'>
                <div className='card-inner'>
                    <h3>REVNUE</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#17ceed" />
                <Bar dataKey="uv" fill="#f27f0c" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#17ceed" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="uv" stroke="#f27f0c" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
  )
}

export default Home
