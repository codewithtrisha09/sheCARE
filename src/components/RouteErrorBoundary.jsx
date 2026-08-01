import { Component } from "react";
import { Link } from "react-router-dom";

export default class RouteErrorBoundary extends Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  componentDidUpdate(previousProps) { if (previousProps.path !== this.props.path && this.state.error) this.setState({ error: null }); }
  render() {
    if (!this.state.error) return this.props.children;
    return <main className="route-error"><p>WE HIT A SMALL BUMP</p><h1>This page needs a quick refresh.</h1><span>Go back to a safe space while we keep your data intact.</span><Link to="/">Back to welcome</Link></main>;
  }
}
