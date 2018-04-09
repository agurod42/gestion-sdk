
declare module 'react-vis-force' {

    interface InteractiveForceGraphProps {
        highlightDependencies?: boolean
        labelAttr?: string
        simulationOptions?: any
        zoom?: boolean
    }

    interface ForceGraphArrowLinkProps {
        link?: any
    }

    interface ForceGraphLinkProps {
        link?: any
    }

    interface ForceGraphNodeProps {
        fill?: string
        node?: any
    }

    export class InteractiveForceGraph extends React.Component<InteractiveForceGraphProps, any> {
    }

    export class ForceGraphArrowLink extends React.Component<ForceGraphArrowLinkProps, any> {
    }

    export class ForceGraphLink extends React.Component<ForceGraphLinkProps, any> {
    }

    export class ForceGraphNode extends React.Component<ForceGraphNodeProps, any> {
    }

}