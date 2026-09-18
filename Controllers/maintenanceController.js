const Maintenance = require('../Model/Maintenance');
const Room = require('../Model/Room');
const Notification = require('../Model/Notification');
const Reservation = require('../Model/Reservation');

exports.createMaintenanceRequest = async (req, res) => {
    try {
        const newRequest = new Maintenance(req.body);
        await newRequest.save();

        // If blockRoom is explicitly requested, block the room
        if (req.body.blockRoom) {
            await Room.findByIdAndUpdate(req.body.roomId, { status: 'maintenance' });
        }

        // Send Notification
        await Notification.create({
            recipientRole: 'admin',
            title: 'New Issue Reported',
            message: `A new ${req.body.issueType || 'Maintenance'} task was reported for a room.`,
            link: '/admin/maintenance'
        });

        res.status(201).json({ message: "Maintenance request created successfully", data: newRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllMaintenanceRequests = async (req, res) => {
    try {
        const requests = await Maintenance.find()
            .populate('roomId', 'roomNumber type floor')
            .populate('requestedBy', 'fullName email')
            .populate('assignedTo', 'fullName role');
        res.json(requests);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getStaffTasks = async (req, res) => {
    try {
        const staffId = req.params.staffId;
        const tasks = await Maintenance.find({ assignedTo: staffId })
            .populate('roomId', 'roomNumber type floor')
            .populate('requestedBy', 'fullName email');
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateMaintenanceStatus = async (req, res) => {
    try {
        const { status, assignedTo, priority, issueType, description, roomId, blockRoom } = req.body;
        const updateData = {};
        
        if (status) updateData.status = status;
        if (assignedTo) updateData.assignedTo = assignedTo;
        if (priority) updateData.priority = priority;
        if (issueType) updateData.issueType = issueType;
        if (description) updateData.description = description;
        if (roomId) updateData.roomId = roomId;

        if (status === 'Resolved') {
            updateData.resolvedAt = new Date();
        }

        const updatedRequest = await Maintenance.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        );

        if (!updatedRequest) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Handle Room Status Updates intelligently
        if (blockRoom === true) {
            await Room.findByIdAndUpdate(updatedRequest.roomId, { status: 'maintenance' });
        } else if (status === 'Resolved' || blockRoom === false) {
            // Restore room to proper status based on current active guests
            const activeRes = await Reservation.findOne({ room: updatedRequest.roomId, status: 'checked-in' });
            const correctStatus = activeRes ? 'occupied' : 'available';
            await Room.findByIdAndUpdate(updatedRequest.roomId, { status: correctStatus });
        }

        res.json({ message: "Status updated successfully", data: updatedRequest });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteMaintenanceRequest = async (req, res) => {
    try {
        const request = await Maintenance.findByIdAndDelete(req.params.id);
        if (!request) return res.status(404).json({ message: 'Request not found' });
        res.json({ message: "Request deleted successfully", data: request });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
