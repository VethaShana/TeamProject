import React, { useEffect } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { MainListItems, SecondaryListItems } from './components/listItems'

import Copyright from '../../components/Copyright'
import { useRouteMatch, Switch, Route, Redirect } from 'react-router-dom'
import Students from './views/Students'
import Applications from './views/Applications'
import Installments from './views/Installments'
import Users from './views/Users'
import Settings from './views/Settings'
import { Paper, Grid } from '@material-ui/core'
import PendingApplications from './components/PendingApplications'
import Card from './components/Card'
import Chart from './components/Chart'
import Title from './components/Title'

// redux
import { connect } from 'react-redux'
import { getStudents } from '../../actions/students'

const mapStateToProps = state => ({
	user: state.user.data,
})

const mapDispatchToProps = { getStudents }

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	toolbar: {
		paddingRight: 24, // keep right padding when drawer closed
	},
	toolbarIcon: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: '0 8px',
		...theme.mixins.toolbar,
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginRight: 36,
	},
	menuButtonHidden: {
		display: 'none',
	},
	title: {
		flexGrow: 1,
	},
	drawerPaper: {
		position: 'relative',
		whiteSpace: 'nowrap',
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerPaperClose: {
		overflowX: 'hidden',
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.spacing(7),
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	paper: {
		padding: theme.spacing(2),
		display: 'flex',
		overflow: 'auto',
		flexDirection: 'column',
	},
	fixedHeight: {
		height: 240,
	},
}))
function Dashboard({ user, getStudents }) {
	const classes = useStyles()
	const [open, setOpen] = React.useState(true)
	const handleDrawerOpen = () => {
		setOpen(true)
	}
	const handleDrawerClose = () => {
		setOpen(false)
	}
	const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
	const { path, url } = useRouteMatch()

	useEffect(() => {
		console.log(user)
		getStudents()
	}, [])

	return (
		<div className={classes.root}>
			<AppBar
				position='absolute'
				className={clsx(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar className={classes.toolbar}>
					<IconButton
						edge='start'
						color='inherit'
						aria-label='open drawer'
						onClick={handleDrawerOpen}
						className={clsx(
							classes.menuButton,
							open && classes.menuButtonHidden
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component='h1'
						variant='h6'
						color='inherit'
						// noWrap
						className={classes.title}
					>
						Dashboard
					</Typography>
					<IconButton color='inherit'>
						<AccountCircleIcon fontSize='default' />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Drawer
				variant='permanent'
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List dense>
					<MainListItems />
				</List>
				<Divider />
				<List dense>
					<SecondaryListItems />
				</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.appBarSpacer} />
				<Container maxWidth={false} className={classes.container}>
					<Switch>
						<Route exact path={path}>
							<Grid container spacing={3}>
								<Grid item xs={12}>
									<Title
										title={`Hi! ${user.name}`}
										description='Welcome Back to the Dashboard'
									/>
								</Grid>
								{/* Chart */}
								<Grid item xs={12} md={8} lg={9}>
									<Paper className={fixedHeightPaper}>
										<Chart />
									</Paper>
								</Grid>
								{/* Recent Statics */}
								<Grid item xs={12} md={4} lg={3}>
									<Paper className={fixedHeightPaper}>
										<Card />
									</Paper>
								</Grid>
								{/* Pending Applications */}
								<Grid item xs={12}>
									<Paper className={classes.paper}>
										<PendingApplications />
									</Paper>
								</Grid>
							</Grid>
						</Route>
						<Route path={`${path}/students`} component={Students} />
						<Route path={`${path}/applications`} component={Applications} />
						<Route path={`${path}/installments`} component={Installments} />
						<Route path={`${path}/users`} component={Users} />
						<Route path={`${path}/settings`} component={Settings} />
						<Route
							path={`${path}/*`}
							render={() => <Redirect to={`${path}`} />}
						/>
					</Switch>
					<Box pt={4}>
						<Copyright />
					</Box>
				</Container>
			</main>
		</div>
	)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
