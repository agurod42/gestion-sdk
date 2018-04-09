import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { InteractiveForceGraph, ForceGraphArrowLink, ForceGraphNode } from 'react-vis-force';

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
                        <InteractiveForceGraph
                            simulationOptions={{
                                width: width || window.innerWidth, 
                                height: height || window.innerHeight - 56 
                            }}
                            labelAttr='title'
                            highlightDependencies={true}
                            zoom={true}
                        >
                            {this.state.data.nodes.map((node: any) => (
                                <ForceGraphNode key={node.id} node={node} fill='red' />
                            ))}
                            {this.state.data.links.map((link: any) => (
                                <ForceGraphArrowLink key={`${link.source}-${link.target}`} link={link} />
                            ))}
                        </InteractiveForceGraph>
                    )}
                </AutoSizer>
            );
        }
	}

}
