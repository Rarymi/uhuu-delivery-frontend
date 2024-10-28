import { ClientProvider } from "./context/ClientContext.tsx"
import { ClientForm } from "./components/client/ClientForm"
import { ClientTable } from "./components/client/ClientTable"
import { MapView } from "./components/MapView"
import { ClientTableInfo } from "./components/client/ClientTableInfo"
import { AppContentContainer, AppMapTableContainer, Divider } from "./App.style"

function App() {
	return (
		<ClientProvider>
			<AppContentContainer>
				<ClientForm />
				<Divider />
				<AppMapTableContainer>
					<MapView />
					<ClientTableInfo />
					<ClientTable />
				</AppMapTableContainer>
			</AppContentContainer>
		</ClientProvider>
	)
}

export default App
