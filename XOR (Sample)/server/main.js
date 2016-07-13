import { Meteor } from 'meteor/meteor';

const synaptic = require('synaptic');
Trainer = synaptic.Trainer;
Architect = synaptic.Architect;


Meteor.startup(() => {
    // code to run on server at startup
});



Meteor.methods({
    'trainNetwork'(trainingData) {
        if(trainingData === null) {
            console.log("Error!");
        }
        else {
            console.log("Training network!");
            var network = new Architect.Perceptron(2, 3, 3, 1);

            const trainer = new Trainer(network);


            const iterations = 20000;
            const rate = 0.1;
            trainer.train(trainingData);
            console.log("Done training network!");
            return network;
        }
    }
});
