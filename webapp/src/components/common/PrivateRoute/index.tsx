import * as React from 'react';
import { Redirect, Route, RouteComponentProps, RouteProps } from 'react-router-dom';

import GestionEnmelon from '../../../services/GestionEnmelon';

type RouteComponent = React.StatelessComponent<RouteComponentProps<{}>> | React.ComponentClass<any>;

const PrivateRoute: React.StatelessComponent<RouteProps> = ({ component, ...props }) => {

    const renderFn = (Component?: RouteComponent) => {
        return (routeProps: RouteProps) => {
            if (!Component) {
                return null;
            }

            if (!GestionEnmelon.tokenExists()) {
                return <Redirect to={{ pathname: `/login` }} />;
            } else {
                return <Component {...routeProps} />;
            }
        };
    };

    return <Route {...props} render={renderFn(component)} />;
    
};

export default PrivateRoute;