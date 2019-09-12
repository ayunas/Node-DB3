const express = require('express');

const Schemes = require('./scheme-model.js');

const router = express.Router();

router.get('/', (req, res) => {
  Schemes.find()
  .then(schemes => {
    res.json(schemes);
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes', error : err.message});
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.findById(id)
  .then(([scheme]) => {
    console.log(scheme);
    if (scheme) {
      res.json(scheme);
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get schemes' });
  });
});

router.get('/:id/steps', (req, res) => {
  const { id } = req.params;

  Schemes.findSteps(id)
  .then(steps => {
    if (steps.length) {
      steps.forEach(step => delete step.scheme_id);  //README specified to not return the scheme_id of the step
      res.json(steps);
    } else {
      res.status(404).json({ message: 'Could not find steps for given scheme', error : err.message })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get steps', error : err.message });
  });
});

router.post('/', (req, res) => {
  const schemeData = req.body;

  Schemes.add(schemeData)
  .then( ([scheme]) => {
    res.status(201).json(scheme);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new scheme', error : err.message });
  });
});

router.post('/:id/steps', (req, res) => {
  const stepData = req.body;
  const { id } = req.params; 

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.addStep(stepData, id)
      .then(step => {
        res.status(201).json(step);
      })
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id.' })
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to create new step' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Schemes.findById(id)
  .then(scheme => {
    if (scheme) {
      Schemes.update(changes, id)
      .then(([updatedScheme]) => {
        updatedScheme.message = "Updated Scheme";
        res.json(updatedScheme);
      })
      .catch(err => res.status(500).json({error : err.message}))
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to update scheme', error : err.message });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Schemes.remove(id)
  .then(deleted => {
    console.log(deleted);
    if (deleted) {
      res.json({ removed: `id # ${id}` });
    } else {
      res.status(404).json({ message: 'Could not find scheme with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete scheme', error: err.message });
  });
});

module.exports = router;