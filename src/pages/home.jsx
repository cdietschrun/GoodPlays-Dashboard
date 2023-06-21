import * as React from "react";
import { animated } from "react-spring";
import { useWiggle } from "../hooks/wiggle";
import { Link } from "wouter";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import { ResponsiveBar } from '@nivo/bar';
import dayjs from 'dayjs'; // ES 2015


// Our language strings for the header
const strings = [
  "Hello React",
  "Salut React",
  "Hola React",
  "안녕 React",
  "Hej React"
];

//import { MongoClient } from "mongodb";


// Utility function to choose a random value from the language arraya
function randomLanguage() {
  return strings[Math.floor(Math.random() * strings.length)];
}

/**
* The Home function defines the content that makes up the main content of the Home page
*
* This component is attached to the /about path in router.jsx
* The function in app.jsx defines the page wrapper that this appears in along with the footer
*/

  //const uri = `mongodb+srv://cdietschrunfast:${process.env.MONGO_DB_PASSWORD}@goodplays.yhu6h4r.mongodb.net/?retryWrites=true&w=majority`;
//const mongoClient = new MongoClient(uri);


export default function Home() {


//run().catch(console.dir);
//console.log('testhey');
  
  /* We use state to set the hello string from the array https://reactjs.org/docs/hooks-state.html
     - We'll call setHello when the user clicks to change the string
  */
  const [hello, setHello] = React.useState(strings[0]);
  
  /* The wiggle function defined in /hooks/wiggle.jsx returns the style effect and trigger function
     - We can attach this to events on elements in the page and apply the resulting style
  */
  const [style, trigger] = useWiggle({ x: 5, y: 5, scale: 1 });
  const data = [
  {
    name: 'Monday',
    leftBoob: 4000,
    rightBoob: 2400,
    amt: 2400,
  },
  {
    name: 'Tuesday',
    leftBoob: 3000,
    rightBoob: 1398,
    amt: 2210,
  },
  {
    name: 'Wednesday',
    leftBoob: 2000,
    rightBoob: 9800,
    amt: 2290,
  },
  {
    name: 'Thursday',
    leftBoob: 2780,
    rightBoob: 3908,
    amt: 2000,
  },
  {
    name: 'Friday',
    leftBoob: 1890,
    rightBoob: 4800,
    amt: 2181,
  },
  {
    name: 'Saturday',
    leftBoob: 2390,
    rightBoob: 3800,
    amt: 2500,
  },
  {
    name: 'Sunday',
    leftBoob: 3490,
    rightBoob: 4300,
    amt: 2100,
  },
];
  
  const nivoData = [
  {
    "country": "AD",
    "hot dog": 174,
    "hot dogColor": "hsl(247, 70%, 50%)",
    "burger": 69,
    "burgerColor": "hsl(45, 70%, 50%)",
    "sandwich": 190,
    "sandwichColor": "hsl(152, 70%, 50%)",
    "kebab": 48,
    "kebabColor": "hsl(214, 70%, 50%)",
    "fries": 1,
    "friesColor": "hsl(68, 70%, 50%)",
    "donut": 88,
    "donutColor": "hsl(333, 70%, 50%)"
  },
  {
    "country": "AE",
    "hot dog": 16,
    "hot dogColor": "hsl(324, 70%, 50%)",
    "burger": 140,
    "burgerColor": "hsl(66, 70%, 50%)",
    "sandwich": 93,
    "sandwichColor": "hsl(181, 70%, 50%)",
    "kebab": 180,
    "kebabColor": "hsl(353, 70%, 50%)",
    "fries": 179,
    "friesColor": "hsl(172, 70%, 50%)",
    "donut": 186,
    "donutColor": "hsl(159, 70%, 50%)"
  },
  {
    "country": "AF",
    "hot dog": 85,
    "hot dogColor": "hsl(135, 70%, 50%)",
    "burger": 55,
    "burgerColor": "hsl(220, 70%, 50%)",
    "sandwich": 71,
    "sandwichColor": "hsl(67, 70%, 50%)",
    "kebab": 81,
    "kebabColor": "hsl(232, 70%, 50%)",
    "fries": 22,
    "friesColor": "hsl(167, 70%, 50%)",
    "donut": 126,
    "donutColor": "hsl(70, 70%, 50%)"
  },
  {
    "country": "AG",
    "hot dog": 32,
    "hot dogColor": "hsl(21, 70%, 50%)",
    "burger": 35,
    "burgerColor": "hsl(227, 70%, 50%)",
    "sandwich": 67,
    "sandwichColor": "hsl(187, 70%, 50%)",
    "kebab": 95,
    "kebabColor": "hsl(258, 70%, 50%)",
    "fries": 117,
    "friesColor": "hsl(34, 70%, 50%)",
    "donut": 33,
    "donutColor": "hsl(48, 70%, 50%)"
  },
  {
    "country": "AI",
    "hot dog": 177,
    "hot dogColor": "hsl(96, 70%, 50%)",
    "burger": 196,
    "burgerColor": "hsl(348, 70%, 50%)",
    "sandwich": 119,
    "sandwichColor": "hsl(287, 70%, 50%)",
    "kebab": 56,
    "kebabColor": "hsl(286, 70%, 50%)",
    "fries": 176,
    "friesColor": "hsl(137, 70%, 50%)",
    "donut": 185,
    "donutColor": "hsl(4, 70%, 50%)"
  },
  {
    "country": "AL",
    "hot dog": 186,
    "hot dogColor": "hsl(94, 70%, 50%)",
    "burger": 133,
    "burgerColor": "hsl(69, 70%, 50%)",
    "sandwich": 173,
    "sandwichColor": "hsl(39, 70%, 50%)",
    "kebab": 29,
    "kebabColor": "hsl(24, 70%, 50%)",
    "fries": 119,
    "friesColor": "hsl(96, 70%, 50%)",
    "donut": 156,
    "donutColor": "hsl(260, 70%, 50%)"
  },
  {
    "country": "AM",
    "hot dog": 65,
    "hot dogColor": "hsl(16, 70%, 50%)",
    "burger": 112,
    "burgerColor": "hsl(225, 70%, 50%)",
    "sandwich": 99,
    "sandwichColor": "hsl(120, 70%, 50%)",
    "kebab": 89,
    "kebabColor": "hsl(114, 70%, 50%)",
    "fries": 135,
    "friesColor": "hsl(106, 70%, 50%)",
    "donut": 13,
    "donutColor": "hsl(7, 70%, 50%)"
  }
];

  // When the user clicks we change the header language
  const handleChangeHello = () => {
  
    
    // Choose a new Hello from our languages1
    const newHello = randomLanguage();
    
    // Call the function to set the state string in our component1
    setHello(newHello);
  };
  
  
 const [game, setGame] = React.useState([]);
const [gameWhen, setGameWhen] = React.useState([]);

   React.useEffect(() => {
      fetch('https://nostalgic-pollen-antimatter.glitch.me/data')
         .then((res) => res.json())
         .then((movieData) => {
            console.log(movieData);
            setGame(movieData[0].gameName);
          let day = dayjs(movieData[0].timestamp);
          console.log(day.isValid());
            setGameWhen(day.format('DD/MM/YYYY [at] h:mm A'));
         })
         .catch((err) => {
            console.log(err.message);
         });
   }, []);
  
  return (
    <>
      <h1 className="title">{hello}!</h1>
      {/* When the user hovers over the image we apply the wiggle style to i1t */}
      <animated.div onMouseEnter={trigger} style={style}>
        <img
          src="https://cdn.glitch.com/2f80c958-3bc4-4f47-8e97-6a5c8684ac2c%2Fillustration.svg?v=1618196579405"
          className="illustration"
          onClick={handleChangeHello}
          alt="Illustration click to change language"
        />
      </animated.div>


      <div className="navigation">
        {/* When the user hovers over this text, we apply the wiggle function to the image style */}
        <animated.div onMouseEnter={trigger}>
          <a className="btn--click-me" onClick={handleChangeHello}>
            //
          </a>
        </animated.div>
      </div>
      
      <h3>Latest game Chris played: {game} </h3>
      <h4>played at: {gameWhen}</h4>
      
      
            Courtney boobs by day
      
        <BarChart
          width={700}
          height={300}
          data={data}
          margin={{
            top: 20,
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
          <Bar dataKey="leftBoob" stackId="a" fill="#8884d8" />
          <Bar dataKey="rightBoob" stackId="a" fill="#82ca9d" />
        </BarChart>
      
      
      ___
     
      <div style={{height: 800, width: 800}}>
        // https://nivo.rocks/bar/
 <ResponsiveBar
        data={nivoData}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'food',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
        </div>
      
      <div className="instructions">
        <h2>Using this project</h2>
        <p>
          This is the Glitch <strong>Hello React</strong> project. You c123an use11
          it to build your own app. See more info in the{" "}
          <Link href="/about">About</Link> page, and check out README.md in the
          editor for additional detail plus next steps you can take!
        </p>
      </div>
    </>
  );
}
