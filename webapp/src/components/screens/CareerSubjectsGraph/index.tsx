import * as React from 'react';
import { Graph } from 'react-d3-graph';
import { AutoSizer } from 'react-virtualized';

import GestionEnmelon from '../../../services/GestionEnmelon';

export default class CareerSubjectsGraph extends React.Component {

    state: any = {
        loading: true,
        data: {}
    };

    componentWillMount() {
        if (Object.keys(this.state.data).length === 0) {
            GestionEnmelon.careerSubjectsGraph('2001').then(res => {
                this.setState({ 
                    data: res.data,
                    loading: false 
                });
            });
        }
    }

    render() {
        if (Object.keys(this.state.data).length === 0) {
            return false;
        } else {
            return (
                <AutoSizer>
                    {({ height, width }) => (
                        <Graph
                            id='subjects-graph' // id is mandatory, if no id is defined rd3g will throw an error
                            data={this.state.data}
                            config={{
                                width: width,
                                height: height,
                                nodeHighlightBehavior: true,
                                node: {
                                    color: 'lightgreen',
                                    highlightStrokeColor: 'blue',
                                    labelProperty: 'title',
                                    size: 120,
                                },
                                link: {
                                    highlightColor: 'lightblue'
                                },
                            }}
                        />
                    )}
                </AutoSizer>
            );
        }
	}

}
