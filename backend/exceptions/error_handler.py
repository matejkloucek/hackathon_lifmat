from flask_restx import Api
from logging import getLogger
from werkzeug.exceptions import NotFound

logger = getLogger(__name__)


def register_error_handlers(api: Api):
    """
    https://flask-restx.readthedocs.io/en/latest/errors.html
    :param api:
    """
    logger.debug("Error handlers registration...")

    @api.errorhandler(NotFound)
    def handle_not_found(ex: NotFound):
        return {"error": "KeyError.",
                "message": "Not found."}, 404

    @api.errorhandler(Exception)
    def handle_exception(ex: Exception):
        return {"error": "Internal server error.",
                "message": "Internal server error. Contact support."}, 500

    @api.errorhandler
    def handle_exception(ex):
        return {"error": "Internal server error.",
                "message": "Internal server error. Contact support."}, 500

    logger.debug("Error handlers have been registered.")
