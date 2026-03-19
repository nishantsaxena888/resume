class NishifyConfigError(Exception):
    """Base exception for config errors"""


class EntityAlreadyExists(NishifyConfigError):
    pass


class EntityNotFound(NishifyConfigError):
    pass


class InvalidEntityConfig(NishifyConfigError):
    pass

