import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useClientContext } from '../../context/ClientContext';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import * as ReactDOMServer from 'react-dom/server';
import { LocationPin, PopUpContent } from './mapView.style';

export const MapView = () => {
	const { clients } = useClientContext();

	const groupedClients = clients.reduce(
		(acc, client) => {
			const key = `${client.latitude}-${client.longitude}`;
			if (!acc[key]) {
				acc[key] = [];
			}
			acc[key].push(client);
			return acc;
		},
		{} as Record<string, typeof clients>,
	);

	return (
		<MapContainer
			center={[-23.5505, -46.6333]}
			zoom={12}
			style={{
				height: '400px',
				width: '100%',
				borderRadius: '12px',
				boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
			}}
		>
			<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
			{Object.keys(groupedClients).map((key) => {
				const clientsAtLocation = groupedClients[key];
				const { latitude, longitude } = clientsAtLocation[0];

				if (latitude === null || longitude === null) {
					console.error('Invalid coordinates:', { latitude, longitude });
					return null;
				}

				const customIcon = L.divIcon({
					className: 'custom-icon',
					html: ReactDOMServer.renderToString(
						<LocationPin>
							<div className="pin-text">{clientsAtLocation.length}</div>
						</LocationPin>,
					),
					iconSize: [25, 41],
					iconAnchor: [12, 41],
				});

				return (
					<Marker key={key} position={[latitude, longitude]} icon={customIcon}>
						<Popup>
							<PopUpContent>
								{clientsAtLocation.map((client, index) => (
									<div key={index}>
										{client.name}: {client.weight} kg
									</div>
								))}
							</PopUpContent>
						</Popup>
					</Marker>
				);
			})}
		</MapContainer>
	);
};
