import React from 'react'
import {Line} from 'react-chartjs-2';


export default function WeightChart(props:any){
    const days = props.days;

    function event(e: any){
        if (e.length > 0){
            const i = e[0]._index
            console.log(`index: ${i}`);
            console.log(`data point clicked: ${days[i].DyDate}`)
        }
        console.log(e)
    }

    return (
        <Line getElementsAtEvent={(e) => event(e)} data = {
        {
            labels: props.labels,
            datasets: [{
                label: "Body Fat % Over Time",
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: props.data
            },
            {
                label: "Muscle Mass % Over Time",
                backgroundColor: 'rgb(132, 99, 255)',
                borderColor: 'rgb(132, 99, 255)',
                data: props.data2
            }
        ]
        }
        } />
    )
}