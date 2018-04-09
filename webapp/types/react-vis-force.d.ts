
declare module 'react-vis-force' {

    interface ForceGraphProps {
        highlightDependencies?: boolean
        labelAttr?: string
        simulationOptions?: any
        zoom?: boolean
    }

    interface InteractiveForceGraphProps extends ForceGraphProps {
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
        r?: number
    }

    export class ForceGraph extends React.Component<ForceGraphProps, any> {
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