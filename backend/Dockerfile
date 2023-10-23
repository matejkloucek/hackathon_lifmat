FROM continuumio/miniconda3

WORKDIR /backend

# Copy the backend directory file to the container
COPY . .

# Create the conda environment from conda.yml
RUN conda env create -f conda.yml

# Activate the conda environment
SHELL ["conda", "run", "-n", "hackaton-lifmat", "/bin/bash", "-c"]

EXPOSE 8080

ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV PYTHONPATH=../

CMD . ~/.bashrc && \
    conda activate hackaton-lifmat && \
    gunicorn  \
        # to get rid of non-json logs at the beggining
        --log-level 'warning' \
        --bind 0.0.0.0:8080 \
        --timeout 1800 \
        --graceful-timeout 1800 \
         backend.app:app
