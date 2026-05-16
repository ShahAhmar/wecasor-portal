<?php

namespace App\Filament\Resources\AbstractSubmissions\Pages;

use App\Filament\Resources\AbstractSubmissions\AbstractSubmissionResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewAbstractSubmission extends ViewRecord
{
    protected static string $resource = AbstractSubmissionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
