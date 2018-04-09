import * as React from 'react';
import { AutoSizer } from 'react-virtualized';
import { InteractiveForceGraph, ForceGraphArrowLink, ForceGraphNode } from 'react-vis-force';

import GestionEnmelon from '../../../services/GestionEnmelon';

const GRAPH_NODE_MIN_RADIUS = 5;

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
                                height: height || window.innerHeight - 56,
                                strength: {
                                    charge: GRAPH_NODE_MIN_RADIUS * -100
                                }
                            }}
                            labelAttr='title'
                            highlightDependencies={true}
                            zoom={true}
                        >
                            {this.renderLinksAndNodes()}
                        </InteractiveForceGraph>
                    )}
                </AutoSizer>
            );
        }
    }

    renderLinksAndNodes(): React.ReactNode {
        let children: any[] = [];
        let nodeR: any = {};

        this.state.data.links.map((link: any) => {
            if (nodeR[link.source] === undefined) {
                nodeR[link.source] = GRAPH_NODE_MIN_RADIUS;
            }

            children.push(<ForceGraphArrowLink key={`${link.source}..${link.target}`} link={link} />);
            nodeR[link.source]++;
        });
        
        this.state.data.nodes.map((node: any) => {
            children.push(
                <ForceGraphNode 
                    key={node.id} 
                    node={node} 
                    r={nodeR[node.id] || GRAPH_NODE_MIN_RADIUS} 
                    showLabel={true}
                    fill='#292929'
                />
            );
        });

        return children;
    }

}
