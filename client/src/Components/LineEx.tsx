import React from 'react'
import {Line} from 'react-chartjs-2';

export default function LineEx(props:any){
    return (
        <Line data = {
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