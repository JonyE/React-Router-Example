import React from 'react';
import RouterApp from './RouterApp';

export default class MainApp extends React.Component {
    constructor(){
        super();
        this.state = {data: null};
    }

    componentDidMount(){
        fetch(process.env.PUBLIC_URL + 'tabs.json')
            .then(res => res.json())
            .then(data => {
                const {tabs} = data;
                this.setState({data: tabs});
            });
    }

    render() {
        const {data} = this.state;
        return (data ? <RouterApp data={data}/> : <div>Loading</div>)

    }

}
