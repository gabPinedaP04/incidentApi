import { Response, Request } from "express";
import { IncidentModel } from "../../data/models/incident.model";

export class IncidentController {
    public getIncidents = async (req: Request, res: Response) => {
        try {
            const { title, description, lat, lng } = req.body;
            const incidents = await IncidentModel.find({
                title: title,
                description: description,
                lat: lat,
                lng: lng
            });

            return res.status(200).send(incidents);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error fetching incidents");
        }
    };

    public createIncidents = async (req: Request, res: Response) => {
        try {
            const { title, description, lat, lng } = req.body;
            const newIncident = await IncidentModel.create({
                title: title,
                description: description,
                lat: lat,
                lng: lng
            });

            return res.status(201).send(newIncident);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error creating incident");
        }
    };

    public getIncidentByid = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const incident = await IncidentModel.findById(id);
            if (!incident) {
                return res.status(404).send("Incident not found");
            }
            return res.status(200).json(incident);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error fetching incident");
        }
    };

    public updateIncident = async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, description, lat, lng } = req.body;
        try {
            const updatedIncident = await IncidentModel.findByIdAndUpdate(
                id,
                { title, description, lat, lng },
                { new: true }
            );
            if (!updatedIncident) {
                return res.status(404).send("Incident not found");
            }
            return res.status(200).send(updatedIncident);
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error updating incident");
        }
    };

    public deleteIncident = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deletedIncident = await IncidentModel.findByIdAndDelete(id);
            if (!deletedIncident) {
                return res.status(404).send("Incident not found");
            }
            return res.status(200).send("Incident deleted successfully");
        } catch (error) {
            console.error(error);
            return res.status(500).send("Error deleting incident");
        }
    };
}
